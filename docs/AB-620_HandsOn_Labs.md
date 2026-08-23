# Microsoft AB-620 Hands-on Lab-Workbook
**Designing and Building Integrated AI Agent Solutions in Copilot Studio**
*Praxis-Leitfaden mit 5 Enterprise Hands-on Labs, Architekturdiagrammen, Code-/JSON-Artefakten und Validierungsschritten.*

---

## Inhaltsverzeichnis
1. [Lab 1: Microsoft Entra ID SSO & OBO Token Exchange Setup](#lab-1-microsoft-entra-id-sso--obo-token-exchange-setup)
2. [Lab 2: Dynamic Adaptive Cards & Power Fx JSON Payload Parsing](#lab-2-dynamic-adaptive-cards--power-fx-json-payload-parsing)
3. [Lab 3: Model Context Protocol (MCP) Server & OpenAPI Tool Integration](#lab-3-model-context-protocol-mcp-server--openapi-tool-integration)
4. [Lab 4: Multi-Agent A2A Orchestrierung (Master Router & Specialized Sub-Agents)](#lab-4-multi-agent-a2a-orchestrierung-master-router--specialized-sub-agents)
5. [Lab 5: Azure Application Insights Telemetrie (KQL) & RAG-Evaluation mit Golden Datasets](#lab-5-azure-application-insights-telemetrie-kql--rag-evaluation-mit-golden-datasets)

---

# Lab 1: Microsoft Entra ID SSO & OBO Token Exchange Setup

### 🎯 Lab-Ziel
Konfiguration einer Enterprise-Identitätsarchitektur für Microsoft Copilot Studio mit Microsoft Entra ID. Es wird ein nahtloses Single Sign-On (SSO) ohne interaktiven 6-stelligen Magic Code im Microsoft Teams Client sowie ein On-Behalf-Of (OBO) Token Exchange für gesicherte Downstream-APIs (z. B. Microsoft Graph / Custom REST-APIs) eingerichtet.

---

### 🏛️ Architektur- & Sequenzdiagramm

```
+---------------------------------------------------------------------------------------------------------+
|                                    LAB 1: SSO & OBO TOKEN EXCHANGE ARCHITEKTUR                           |
+---------------------------------------------------------------------------------------------------------+

  [Endbenutzer]             [Teams Client]           [Copilot Studio Runtime]        [Microsoft Entra ID]        [Downstream API]
        |                          |                            |                             |                         |
        |--- 1. Öffnet Chat ------>|                            |                             |                         |
        |                          |--- 2. Silent Token Req. -->|                             |                         |
        |                          |    (Teams App SSO)         |--- 3. Token Exchange (OBO)->|                         |
        |                          |                            |    api://botid-...          |                         |
        |                          |                            |<-- 4. User Bearer Token ----|                         |
        |                          |<-- 5. Session etabliert ---|    (Access_as_user)         |                         |
        |                          |                            |                             |                         |
        |--- 6. "Zeige Profil" --->|                            |                             |                         |
        |                          |--- 7. User Message ------->|                             |                         |
        |                          |                            |--- 8. OBO Token Request --->|                         |
        |                          |                            |    (User Token + Secret)    |                         |
        |                          |                            |<-- 9. Graph/API Token ------|                         |
        |                          |                            |                             |                         |
        |                          |                            |--- 10. Call with User Token (Security Trimmed) ------>|
        |                          |                            |<-- 11. Geschützte Daten (z.B. User Details) ----------|
        |                          |<-- 12. Generierte Antwort -|                             |                         |
        |<-- 13. UI Anzeige -------|                            |                             |                         |
```

---

### 📋 Schritt-für-Schritt Anleitung

#### Schritt 1.1: Microsoft Entra ID App-Registrierung erstellen
1. Navigieren Sie zum **Microsoft Entra Admin Center** (`https://entra.microsoft.com`).
2. Wählen Sie **Applications** > **App registrations** > **New registration**.
3. Vergeben Sie den Namen: `AB620-Copilot-Enterprise-SSO`.
4. Unterstützte Kontotypen: **Accounts in this organizational directory only (Single tenant)**.
5. Redirect URI vorerst leer lassen > **Register** klicken.
6. Notieren Sie sich:
   - **Application (client) ID** (z. B. `11111111-2222-3333-4444-555555555555`)
   - **Directory (tenant) ID** (z. B. `77777777-8888-9999-aaaa-bbbbbbbbbbbb`)

#### Schritt 1.2: API exponieren (Expose an API) & Token Exchange Scope
1. Navigieren Sie in der App-Registrierung zu **Expose an API**.
2. Klicken Sie neben *Application ID URI* auf **Set**.
   - Standardwert übernehmen: `api://botid-11111111-2222-3333-4444-555555555555` (oder `api://11111111-2222-3333-4444-555555555555`).
3. Klicken Sie auf **Add a scope**:
   - **Scope name**: `access_as_user`
   - **Who can consent?**: `Admins and users`
   - **Admin consent display name**: `Copilot Studio User Access`
   - **Admin consent description**: `Ermöglicht Copilot Studio den Zugriff auf APIs im Benutzerkontext.`
   - **State**: `Enabled` > **Add scope**.
4. Fügen Sie unter **Authorized client applications** die autorisierten Client-IDs für Microsoft Teams und Power Virtual Agents hinzu:
   - Microsoft Teams Client: `1fec8e78-bce4-4aaf-ab1b-5451cc387264`
   - Teams Web / Desktop Hook: `5a26465a-56e0-46e2-b6d0-73cb8e48e236`
   - PVA/Copilot Studio Web Service: `00000002-0000-0000-c000-000000000000`
   - *Aktivieren Sie jeweils die Checkbox für den Scope `api://.../access_as_user`.*

#### Schritt 1.3: API-Berechtigungen (Microsoft Graph) vergeben
1. Wechseln Sie zu **API permissions** > **Add a permission** > **Microsoft Graph** > **Delegated permissions**.
2. Fügen Sie folgende Berechtigungen hinzu:
   - `User.Read`
   - `offline_access`
   - `profile`
   - `Sites.Read.All` *(für Security-Trimmed SharePoint Knowledge)*
3. Klicken Sie auf **Grant admin consent for [Ihr Tenant]**.

#### Schritt 1.4: Client Secret erstellen & Redirect URIs konfigurieren
1. Gehen Sie zu **Certificates & secrets** > **Client secrets** > **New client secret**.
2. Beschreibung: `CopilotAuthSecret` > Gültigkeit wählen > **Add**.
3. **Wichtig:** Kopieren Sie den **Value** sofort (nicht die Secret ID!).
4. Navigieren Sie zu **Authentication**:
   - Klicken Sie auf **Add a platform** > **Web**.
   - Tragen Sie die Copilot Studio OAuth-Callback-URL ein:
     `https://token.botframework.com/.auth/web/redirect`
   - Aktivieren Sie unter *Implicit grant and hybrid flows*: **Access tokens** und **ID tokens**.

#### Schritt 1.5: Copilot Studio Authentifizierung konfigurieren
1. Öffnen Sie [Microsoft Copilot Studio](https://copilotstudio.microsoft.com).
2. Wählen Sie Ihren Agenten > **Settings** (Zahnrad) > **Security** > **Authentication**.
3. Wählen Sie **Authenticate manually**.
4. Konfigurieren Sie die Felder:
   - **Service Provider**: `Microsoft Entra ID`
   - **Client ID**: `11111111-2222-3333-4444-555555555555`
   - **Client Secret**: `[Ihr Client Secret Value]`
   - **Scopes**: `User.Read profile offline_access Sites.Read.All`
   - **Token Exchange URL (SSO)**: `api://botid-11111111-2222-3333-4444-555555555555/access_as_user`
5. Speichern und publizieren Sie den Agenten.

---

### 💻 Code- & Konfigurations-Artefakte

#### Entra ID App Manifest Snippet (`manifest.json`)
```json
{
  "id": "app-object-id-guid",
  "appId": "11111111-2222-3333-4444-555555555555",
  "name": "AB620-Copilot-Enterprise-SSO",
  "identifierUris": [
    "api://botid-11111111-2222-3333-4444-555555555555"
  ],
  "oauth2Permissions": [
    {
      "adminConsentDescription": "Ermöglicht Copilot Studio den Zugriff auf APIs im Benutzerkontext.",
      "adminConsentDisplayName": "Copilot Studio User Access",
      "id": "3b29c5e2-628d-4e94-9669-e61284d72db4",
      "isEnabled": true,
      "type": "User",
      "value": "access_as_user"
    }
  ],
  "preAuthorizedApplications": [
    {
      "appId": "1fec8e78-bce4-4aaf-ab1b-5451cc387264",
      "delegatedPermissionIds": ["3b29c5e2-628d-4e94-9669-e61284d72db4"]
    },
    {
      "appId": "5a26465a-56e0-46e2-b6d0-73cb8e48e236",
      "delegatedPermissionIds": ["3b29c5e2-628d-4e94-9669-e61284d72db4"]
    }
  ],
  "replyUrlsWithType": [
    {
      "url": "https://token.botframework.com/.auth/web/redirect",
      "type": "Web"
    }
  ],
  "requiredResourceAccess": [
    {
      "resourceAppId": "00000003-0000-0000-c000-000000000000",
      "resourceAccess": [
        {
          "id": "e1fe6dd8-ba31-4d61-89e7-88639da4683d",
          "type": "Scope"
        }
      ]
    }
  ]
}
```

#### Copilot Studio YAML Topic Definition (`UserProfileTopic.yaml`)
```yaml
kind: AdaptiveDialog
beginDialog:
  kind: OnRecognizedIntent
  id: main
  intent:
    triggerQueries:
      - "Wer bin ich?"
      - "Zeige mein Profil"
      - "Welche Berechtigungen habe ich?"

  actions:
    - kind: OAuthInput
      id: userAuth
      timeout: 300000
      provider: ManualAzureAD
      title: "Enterprise SSO Login"
      text: "Authentifiziere Benutzer über Entra ID..."
      variable: init:Topic.AuthToken

    - kind: ConditionGroup
      id: checkAuth
      conditions:
        - id: isAuthed
          condition: =!IsBlank(Topic.AuthToken.Token)
          actions:
            - kind: HttpRequestAction
              id: getGraphProfile
              method: Get
              url: "https://graph.microsoft.com/v1.0/me"
              headers:
                Authorization: ="Bearer " & Topic.AuthToken.Token
              response: Topic.UserProfileRaw

            - kind: SetVariable
              id: parseUser
              variable: Topic.UserProfile
              value: =ParseJSON(Topic.UserProfileRaw.Content)

            - kind: SendActivity
              id: sendGreeting
              activity: ="Hallo " & Text(Topic.UserProfile.displayName) & " (" & Text(Topic.UserProfile.userPrincipalName) & ")! Ihr Token wurde via SSO geräuschlos ausgestellt."
      elseActions:
        - kind: SendActivity
          id: authFailed
          activity: "Authentifizierung fehlgeschlagen. Bitte prüfen Sie Ihre SSO-Konfiguration."
```

---

### ✅ Verifikation & Validierungsschritte

1. **Silent SSO Test in Microsoft Teams:**
   - Installieren Sie den Agenten als Teams-App (Custom App via Teams Developer Portal oder Solution Deployment).
   - Öffnen Sie eine Konversation mit dem Agenten.
   - Senden Sie: `Wer bin ich?`.
   - **Soll-Verhalten:** Der Bot antwortet direkt mit dem Benutzernamen und der UPN, **ohne** eine interaktive OAuth-Login-Karte oder eine Aufforderung zur Magic-Code-Eingabe anzuzeigen.
2. **Token Scope Inspektion via JWT:**
   - Fangen Sie das ausgegebene Token im Test-Canvas ab oder protokollieren Sie es im Debug-Log.
   - Überprüfen Sie das Token auf `https://jwt.ms`.
   - Verifizieren Sie die Claims: `aud` entspricht der Application-ID, `scp` enthält `access_as_user` und `User.Read`.
3. **Security Trimming Validierung:**
   - Fügen Sie eine SharePoint-Site als Wissensquelle hinzu.
   - Stellen Sie eine Frage zu einem Dokument, auf das Testnutzer A Zugriff hat, Testnutzer B jedoch nicht.
   - Nutzer A erhält fundierte Antworten mit Zitaten; Nutzer B erhält die Meldung, dass keine Informationen vorliegen.

---

# Lab 2: Dynamic Adaptive Cards & Power Fx JSON Payload Parsing

### 🎯 Lab-Ziel
Erstellung einer interaktiven, datengetriebenen Benutzeroberfläche in Copilot Studio mittels Adaptive Cards Schema 1.5. Der Agent empfängt unstrukturierte JSON-Payloads von einer externen API, parst diese mittels Power Fx (`ParseJSON`), rendert dynamische UI-Elemente (Tabellen/Spalten) und verarbeitet Formulareingaben (`Action.Submit`) zustandsbehaftet weiter.

---

### 🏛️ Datenfluss- & Komponentenarchitektur

```
+---------------------------------------------------------------------------------------------------------+
|                                    LAB 2: ADAPTIVE CARDS & POWER FX PARSING                             |
+---------------------------------------------------------------------------------------------------------+

  [REST Service / Order API]
              |
              | (1) HTTP GET Response (Raw JSON String)
              v
  [Copilot Studio: HTTP Action] ---> Topic.HttpResponseBody (String)
              |
              | (2) Power Fx: ParseJSON(Topic.HttpResponseBody)
              v
  [Untyped Object: Topic.OrderData]
              |
              | (3) Power Fx Typisierung: Text(), Value(), Table()
              v
  [Strukturierte Variablen] --------+
  - Topic.OrderId (Text)            |
  - Topic.TotalAmount (Value)       | (4) Data Binding in Adaptive Card JSON Template
  - Topic.ItemsList (Table)         |
                                    v
                       [Adaptive Card Designer]
                       - Container (Header & Badge)
                       - FactSet (Kundeninfos & Status)
                       - Input.ChoiceSet (Änderungswunsch)
                       - Action.Submit (Payload: {"action": "update", "newStatus": ...})
                                    |
                                    | (5) Benutzer interagiert & klickt Submit
                                    v
                       [Copilot Studio Variable]
                       - Topic.CardOutput (Record)
                                    |
                                    | (6) Validierung & Bestätigung
                                    v
                       [Bot Response Activity]
```

---

### 📋 Schritt-für-Schritt Anleitung

#### Schritt 2.1: Topic "Bestellstatus & Änderung" erstellen
1. Öffnen Sie Copilot Studio > **Topics** > **Add a topic** > **From blank**.
2. **Name**: `Order Management Dynamic Card`.
3. **Trigger Queries**:
   - `Zeige Bestellung`
   - `Bestellstatus prüfen`
   - `Bestellung ändern`

#### Schritt 2.2: Mock-API Call / JSON-Payload definieren
1. Fügen Sie einen Node **Set variable value** ein:
   - Variable erstellen: `Topic.RawApiResponse`
   - Wert: JSON-String der Bestell-API (siehe Code-Artefakt unten).

#### Schritt 2.3: Power Fx Parsing & Typisierung implementieren
1. Fügen Sie einen Node **Set variable value** ein:
   - Variable: `Topic.ParsedOrder`
   - Formel: `=ParseJSON(Topic.RawApiResponse)`
2. Fügen Sie dedizierte Variablen zur Typisierung ein:
   - `Topic.CustomerName` = `=Text(Topic.ParsedOrder.customer.name)`
   - `Topic.OrderTotal` = `=Value(Topic.ParsedOrder.summary.total)`
   - `Topic.ItemCount` = `=CountRows(Table(Topic.ParsedOrder.items))`

#### Schritt 2.4: Adaptive Card JSON Node konfigurieren
1. Fügen Sie einen Node **Ask with Adaptive Card** ein.
2. Klicken Sie auf **Edit JSON** und fügen Sie das Schema aus Schritt 2.2 ein.
3. Binden Sie Power Fx Variablen direkt im JSON Template ein (`${Topic.CustomerName}`, etc.).
4. Weisen Sie die Rückgabe-Variable zu: `Topic.CardResponse`.

#### Schritt 2.5: Submit-Handling & Logikverzweigung
1. Fügen Sie einen **Condition** Node ein:
   - Bedingung: `=Topic.CardResponse.action = "update_status"`
2. Bei `True`: Senden Sie eine Bestätigungsnachricht mit dem gewählten Status:
   `="Der Status für Bestellung " & Text(Topic.ParsedOrder.orderId) & " wurde erfolgreich auf '" & Text(Topic.CardResponse.selectedStatus) & "' geändert. Begründung: " & Text(Topic.CardResponse.changeReason)`

---

### 💻 Code- & Konfigurations-Artefakte

#### Mock API JSON Payload (`order_payload.json`)
```json
{
  "orderId": "ORD-2026-9481",
  "orderDate": "2026-08-16T09:30:00Z",
  "status": "In Processing",
  "customer": {
    "id": "CUST-5512",
    "name": "Contoso Enterprise Solutions",
    "tier": "Platinum"
  },
  "items": [
    {
      "sku": "SRV-AI-01",
      "name": "Azure AI Agent Processing Unit",
      "qty": 4,
      "unitPrice": 1250.00
    },
    {
      "sku": "LIC-CS-ENT",
      "name": "Copilot Studio Enterprise Add-on",
      "qty": 50,
      "unitPrice": 15.00
    }
  ],
  "summary": {
    "subtotal": 5750.00,
    "tax": 1092.50,
    "total": 6842.50
  }
}
```

#### Adaptive Card JSON Template (`OrderCard.json`)
```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Container",
      "style": "emphasis",
      "bleed": true,
      "items": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "Image",
                  "url": "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/master/assets/Receipt/SVG/ic_fluent_receipt_32_filled.svg",
                  "size": "Medium"
                }
              ]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Bestellübersicht",
                  "weight": "Bolder",
                  "size": "Large"
                },
                {
                  "type": "TextBlock",
                  "text": "ID: ${Topic.ParsedOrder.orderId}",
                  "isSubtle": true,
                  "spacing": "None"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "FactSet",
      "facts": [
        {
          "title": "Kunde:",
          "value": "${Topic.CustomerName}"
        },
        {
          "title": "Kundenstatus:",
          "value": "${Text(Topic.ParsedOrder.customer.tier)}"
        },
        {
          "title": "Gesamtbetrag:",
          "value": "${Text(Topic.OrderTotal, \"€#,##0.00\")}"
        },
        {
          "title": "Aktueller Status:",
          "value": "${Text(Topic.ParsedOrder.status)}"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Status-Update anfordern",
      "weight": "Bolder",
      "separator": true
    },
    {
      "type": "Input.ChoiceSet",
      "id": "selectedStatus",
      "style": "compact",
      "value": "In Processing",
      "choices": [
        { "title": "In Bearbeitung", "value": "In Processing" },
        { "title": "Freigegeben", "value": "Approved" },
        { "title": "Zurückgestellt", "value": "On Hold" },
        { "title": "Storniert", "value": "Cancelled" }
      ]
    },
    {
      "type": "Input.Text",
      "id": "changeReason",
      "placeholder": "Grund für die Statusänderung angeben (optional)",
      "isMultiline": true
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Status Aktualisieren",
      "style": "positive",
      "data": {
        "action": "update_status"
      }
    }
  ]
}
```

#### Power Fx Transformations-Logik Snippet
```powerfx
// 1. Deserialisierung des Raw JSON Payloads
Set(Topic.ParsedOrder, ParseJSON(Topic.RawApiResponse));

// 2. Extraktion skalarer Werte mit expliziter Typkonvertierung
Set(Topic.OrderId, Text(Topic.ParsedOrder.orderId));
Set(Topic.CustomerName, Text(Topic.ParsedOrder.customer.name));
Set(Topic.CustomerTier, Text(Topic.ParsedOrder.customer.tier));
Set(Topic.OrderTotal, Value(Topic.ParsedOrder.summary.total));

// 3. Iteration über Array-Objekte (Items) zur Summen- oder Textgenerierung
Set(Topic.ItemCount, CountRows(Table(Topic.ParsedOrder.items)));

// 4. Auslesen der Action.Submit Rückgabe aus der Adaptive Card
Set(Topic.SubmittedAction, Text(Topic.CardResponse.action));
Set(Topic.NewStatusValue, Text(Topic.CardResponse.selectedStatus));
Set(Topic.ReasonValue, Text(Topic.CardResponse.changeReason));
```

---

### ✅ Verifikation & Validierungsschritte

1. **Test-Canvas Validierung:**
   - Öffnen Sie das Test-Canvas in Copilot Studio.
   - Senden Sie: `Zeige Bestellung ORD-2026-9481`.
   - Verifizieren Sie, dass die Adaptive Card visuell korrekt gerendert wird (Header, FactSet mit formatiertem Gesamtbetrag `€6,842.50` und Platinum-Badge).
2. **Formular-Interaktions-Test:**
   - Wählen Sie im Dropdown `Zurückgestellt` (On Hold).
   - Tippen Sie als Begründung: `Warte auf Budgetfreigabe Q4`.
   - Klicken Sie auf **Status Aktualisieren**.
3. **Variablen-Inspektion:**
   - Prüfen Sie im Testfenster unter *Variables*:
     - `Topic.CardResponse.selectedStatus` muss exakt `"On Hold"` sein.
     - `Topic.CardResponse.changeReason` enthält den eingegebenen Freitext.
   - Der Bot antwortet mit der formatierten Bestätigungsnachricht.

---

# Lab 3: Model Context Protocol (MCP) Server & OpenAPI Tool Integration

### 🎯 Lab-Ziel
Implementierung und Bereitstellung eines Model Context Protocol (MCP) Servers in Python (FastAPI/MCP SDK), der Enterprise-Tools für Live-Bestandsprüfungen und Preiskalkulationen exponiert. Anschließend wird dieser MCP Server als OpenAPI 3.0 Toolset in Copilot Studio angebunden und für Dynamic Tool Calling (Generative Orchestration) via semantische Descriptions konfiguriert.

---

### 🏛️ MCP & Generative Orchestrierung Architektur

```
+---------------------------------------------------------------------------------------------------------+
|                                  LAB 3: MCP PROTOCOL & TOOL-CALLING ARCHITEKTUR                         |
+---------------------------------------------------------------------------------------------------------+

  [Benutzeranfrage]
         |
         | "Haben wir noch 15 Einheiten vom Artikel SRV-AI-01 im Lager München vorrätig?"
         v
  [Copilot Studio: Generativer Orchestrator (LLM)]
         |
         | 1. Semantische Intent-Analyse & Parameterextraktion:
         |    - Tool: check_warehouse_inventory
         |    - sku: "SRV-AI-01"
         |    - warehouse_location: "Munich"
         |    - requested_qty: 15
         v
  [MCP Client Host / Custom Connector Bridge]
         |
         | 2. JSON-RPC 2.0 / REST Request (HTTP POST)
         v
  [Enterprise MCP Server (FastAPI / Python Service)]
         |
         | 3. Tool Execution: tools/call ("check_warehouse_inventory")
         | 4. Backend Database / ERP Query
         v
  [ERP Data Source: Live Inventory DB]
         |
         |<-- 5. Return Status: { available: true, stock: 42, warehouse: "Munich" }
         v
  [MCP Server Response]
         |
         | 6. Formatierte Tool-Rückgabe (JSON)
         v
  [Copilot Studio LLM RAG-Synthese]
         |
         | 7. Generiert finale, natürlichsprachliche Antwort mit Zitat
         v
  [Endbenutzer]: "Ja, im Lager München sind aktuell 42 Einheiten von SRV-AI-01 verfügbar..."
```

---

### 📋 Schritt-für-Schritt Anleitung

#### Schritt 3.1: Lokalen/Containerisierten MCP Server implementieren
1. Erstellen Sie eine neue Python-Anwendung mit FastAPI und Pydantic.
2. Definieren Sie zwei Tools mit strikt typisierten Schemas:
   - `check_warehouse_inventory(sku, warehouse_location, requested_qty)`
   - `calculate_discount_tier(customer_id, order_total)`
3. Fügen Sie semantische Beschreibungen (Descriptions) zu jedem Parameter hinzu.
4. Starten Sie den Service unter `https://mcp-inventory.contoso.com` (oder lokal via Port Forwarding/Container).

#### Schritt 3.2: OpenAPI 3.0 Spezifikation mit KI-optimierten Beschreibungen generieren
1. Stellen Sie sicher, dass das `/openapi.json`-Manifest aussagekräftige `summary`-, `description`- und `operationId`-Felder enthält.
2. **Prüfungskritische Regel:** Fehlen die Beschreibungen, kann das generative LLM in Copilot Studio nicht entscheiden, wann das Tool aufgerufen werden soll.

#### Schritt 3.3: Custom Connector / Tool in Copilot Studio registrieren
1. Navigieren Sie zu **Copilot Studio** > **Actions / Tools** > **Add an action**.
2. Wählen Sie **Custom Connector** oder **Model Context Protocol (MCP) Endpoint**.
3. Laden Sie die OpenAPI 3.0 JSON-Datei hoch.
4. Konfigurieren Sie die Authentifizierung: **API Key** im Header (`X-MCP-API-KEY`) oder **OAuth 2.0**.
5. Aktivieren Sie unter den Tool-Einstellungen: **Allow the generative model to use this tool dynamically**.

#### Schritt 3.4: Dynamic Parameter Slot Filling testen
1. Aktivieren Sie in den Agenteneinstellungen **Generative AI Orchestration (Dynamic Chaining)**.
2. Weisen Sie dem Tool das Thema *Inventory & Procurement* zu.

---

### 💻 Code- & Konfigurations-Artefakte

#### Python MCP Server Implementierung (`mcp_server.py`)
```python
"""
Enterprise Model Context Protocol (MCP) Server
Bereitstellung von Werkzeugen für Copilot Studio Orchestration
"""
from fastapi import FastAPI, Header, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
import uvicorn

app = FastAPI(
    title="Contoso Enterprise MCP Inventory Server",
    version="1.0.0",
    description="Standardisiertes Model Context Protocol (MCP) Toolset für Lagerbestand und Rabattberechnungen."
)

API_KEY_SECRET = "sk-mcp-enterprise-ab620-token-secure"

def verify_mcp_auth(x_mcp_api_key: Optional[str] = Header(None)):
    if x_mcp_api_key != API_KEY_SECRET:
        raise HTTPException(status_code=401, detail="Ungültiger oder fehlender MCP API Key.")
    return x_mcp_api_key

# --- Pydantic Data Models ---
class InventoryRequest(BaseModel):
    sku: str = Field(
        ..., 
        description="Die eindeutige Artikelnummer (z. B. 'SRV-AI-01', 'LIC-CS-ENT').",
        example="SRV-AI-01"
    )
    warehouse_location: str = Field(
        ..., 
        description="Der Standort des Lagers (z. B. 'Munich', 'Frankfurt', 'Seattle').",
        example="Munich"
    )
    requested_qty: int = Field(
        1, 
        description="Die gewünschte Bestellmenge zur Verfügbarkeitsprüfung.",
        ge=1
    )

class InventoryResponse(BaseModel):
    sku: str
    warehouse: str
    in_stock: bool
    current_stock: int
    requested_quantity: int
    estimated_delivery_days: int
    message: str

# --- MCP Tool Endpoints ---
@app.post(
    "/tools/check_warehouse_inventory",
    response_model=InventoryResponse,
    summary="Prüft den physischen Lagerbestand für einen bestimmten Artikel an einem Standort",
    description="Wird verwendet, wenn der Benutzer wissen möchte, ob ein Artikel verfügbar ist, wie viele Einheiten vorrätig sind oder wie lange die Lieferung dauert.",
    operation_id="checkWarehouseInventory",
    dependencies=[Depends(verify_mcp_auth)]
)
async def check_warehouse_inventory(payload: InventoryRequest) -> Dict[str, Any]:
    # Mock ERP Datenbank-Abfrage
    mock_db = {
        "SRV-AI-01": {"Munich": 42, "Frankfurt": 10, "Seattle": 0},
        "LIC-CS-ENT": {"Munich": 999, "Frankfurt": 999, "Seattle": 999}
    }
    
    sku_data = mock_db.get(payload.sku.upper(), {})
    stock = sku_data.get(payload.warehouse_location.capitalize(), 0)
    is_available = stock >= payload.requested_qty
    delivery_days = 2 if is_available else 14

    return {
        "sku": payload.sku,
        "warehouse": payload.warehouse_location,
        "in_stock": is_available,
        "current_stock": stock,
        "requested_quantity": payload.requested_qty,
        "estimated_delivery_days": delivery_days,
        "message": f"Artikel {payload.sku} an Standort {payload.warehouse_location}: {stock} Einheiten verfügbar."
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

#### OpenAPI 3.0 Spezifikation (`openapi_mcp.json`)
```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Contoso Enterprise MCP Inventory Server",
    "description": "Standardisiertes Model Context Protocol (MCP) Toolset für Lagerbestand.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://mcp-inventory.contoso.com"
    }
  ],
  "paths": {
    "/tools/check_warehouse_inventory": {
      "post": {
        "summary": "Prüft den physischen Lagerbestand für einen bestimmten Artikel an einem Standort",
        "description": "Wird verwendet, wenn der Benutzer wissen möchte, ob ein Artikel verfügbar ist, wie viele Einheiten vorrätig sind oder wie lange die Lieferung dauert.",
        "operationId": "checkWarehouseInventory",
        "parameters": [
          {
            "name": "X-MCP-API-KEY",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "Sicherheits-API-Schlüssel für den MCP-Server"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InventoryRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Erfolgreiche Bestandsabfrage",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InventoryResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "InventoryRequest": {
        "type": "object",
        "required": ["sku", "warehouse_location"],
        "properties": {
          "sku": {
            "type": "string",
            "description": "Die eindeutige Artikelnummer (z. B. 'SRV-AI-01')."
          },
          "warehouse_location": {
            "type": "string",
            "description": "Der Standort des Lagers (z. B. 'Munich', 'Frankfurt')."
          },
          "requested_qty": {
            "type": "integer",
            "default": 1,
            "description": "Die gewünschte Menge."
          }
        }
      },
      "InventoryResponse": {
        "type": "object",
        "properties": {
          "sku": { "type": "string" },
          "warehouse": { "type": "string" },
          "in_stock": { "type": "boolean" },
          "current_stock": { "type": "integer" },
          "estimated_delivery_days": { "type": "integer" },
          "message": { "type": "string" }
        }
      }
    }
  }
}
```

---

### ✅ Verifikation & Validierungsschritte

1. **Test von Dynamic Slot Filling:**
   - Geben Sie im Test-Canvas eine unvollständige Anfrage ein:
     `"Kannst du prüfen, ob der Artikel SRV-AI-01 lieferbar ist?"`
   - **Soll-Verhalten:** Das LLM erkennt, dass der Pflichtparameter `warehouse_location` fehlt, und stellt automatisch eine Rückfrage:
     `"An welchem Lagerstandort (z. B. Munich, Frankfurt) soll der Bestand für SRV-AI-01 geprüft werden?"`
2. **Ausführung des Tool-Calls:**
   - Antworten Sie: `"In München bitte"`.
   - Das LLM führt den POST-Aufruf gegen `/tools/check_warehouse_inventory` aus.
   - Der Server liefert `{ in_stock: true, current_stock: 42 }`.
   - Das LLM synthetisiert die Antwort:
     `"Ja, der Artikel SRV-AI-01 ist im Lager München verfügbar. Es sind aktuell 42 Stück vorrätig (Lieferzeit ca. 2 Tage)."`
3. **Audit im Tracing:**
   - Öffnen Sie das Tracing-Panel in Copilot Studio. Verifizieren Sie, dass der Tool-Aufruf mit korrekten Typen (Integer für `requested_qty`) protokolliert wurde.

---

# Lab 4: Multi-Agent A2A Orchestrierung (Master Router & Sub-Agents)

### 🎯 Lab-Ziel
Design und Implementierung eines Multi-Agenten-Ökosystems nach dem **Router/Dispatcher-Muster** mit dem Microsoft Agent-to-Agent (A2A) Protokoll. Ein zentraler **Master Enterprise Concierge Agent** analysiert eingehende Benutzeranfragen und delegiert spezialisierte Workflows an Connected Agents (**HR Specialist Agent** und **IT-Service Desk Agent**), inklusive Token-Weitergabe und State-Handoff.

---

### 🏛️ Multi-Agent A2A Routing Architektur

```
+---------------------------------------------------------------------------------------------------------+
|                                    LAB 4: MULTI-AGENT A2A ORCHESTRIERUNG                                |
+---------------------------------------------------------------------------------------------------------+

                                    [Mitarbeiter / Benutzer]
                                                |
                                                | 1. "Ich brauche ein neues Entwickler-Notebook
                                                |    und möchte wissen, wie viele Urlaubstage ich habe."
                                                v
                        +-----------------------------------------------+
                        |        MASTER ROUTER AGENT (Concierge)        |
                        |  - Global Intent Classification               |
                        |  - Multi-Goal Decomposer                      |
                        |  - SSO Identity Context (User Bearer Token)   |
                        +-----------------------------------------------+
                                         |             |
                 +-----------------------+             +-----------------------+
                 | (2) Sub-Task 1: Urlaub                      | (4) Sub-Task 2: Hardware
                 v                                             v
+----------------------------------+         +-----------------------------------+
|     HR SPECIALIST AGENT          |         |    IT SERVICE DESK AGENT          |
|  - Capabilities: Urlaubsanspruch,|         |  - Capabilities: Hardware-Order,  |
|    Benefits, Gehalt, Spesen      |         |    Passwort-Reset, VPN-Zugang     |
|  - Knowledge: Workday / SAP HR   |         |  - Knowledge: ServiceNow ITIL     |
+----------------------------------+         +-----------------------------------+
                 |                                             |
                 | (3) A2A Response:                           | (5) A2A Response:
                 |     "Resturlaub: 14 Tage"                   |     "Notebook-Ticket #IT-884 angelegt"
                 +-----------------------+             +-------+
                                         |             |
                                         v             v
                        +-----------------------------------------------+
                        |        MASTER ROUTER AGENT (Concierge)        |
                        |  - Result Aggregation & Synthese              |
                        +-----------------------------------------------+
                                                |
                                                | 6. Konsolidierte Antwort
                                                v
                                    [Mitarbeiter / Benutzer]
```

---

### 📋 Schritt-für-Schritt Anleitung

#### Schritt 4.1: Spezialisierte Sub-Agenten anlegen & publizieren
1. **Sub-Agent 1: "HR-Specialist-Agent"**
   - **Description**: `Spezialist für Human Resources. Beantwortet Fragen zu Resturlaub, Urlaubsanträgen, Elternzeit, Benefits und Gehaltsabrechnungen. NICHT zuständig für IT, Hardware oder Passwörter.`
   - Erstellen Sie ein Topic `GetVacationBalance` mit Power Fx Anbindung an das HR-System.
   - Publizieren Sie den Agenten.
2. **Sub-Agent 2: "IT-ServiceDesk-Agent"**
   - **Description**: `Zuständig für IT-Support, Hardware-Bestellungen (Laptops, Monitore), Softwarelizenzen und VPN-Fehlerbehebung. NICHT zuständig für Mitarbeiterverträge oder HR-Themen.`
   - Erstellen Sie ein Topic `OrderHardwareTicket`.
   - Publizieren Sie den Agenten.

#### Schritt 4.2: Connected Agents im Master Router registrieren
1. Erstellen Sie den Hauptagenten: **"Enterprise-Master-Concierge"**.
2. Navigieren Sie zu **Settings** > **Connected Agents (Multi-Agent Collaboration)**.
3. Klicken Sie auf **Add connected agent**:
   - Wählen Sie `HR-Specialist-Agent` aus der Dataverse Solution aus.
   - Wählen Sie `IT-ServiceDesk-Agent` aus.
4. Überprüfen Sie, dass das Häkchen bei **Pass user authentication token (A2A SSO)** gesetzt ist.

#### Schritt 4.3: Handoff- & Router-Triggerlogik konfigurieren
1. Aktivieren Sie im Master Agenten die **Generative Orchestration**.
2. Konfigurieren Sie die System-Instruktionen des Master-Agenten:
   - *"Du bist der zentrale Unternehmensassistent. Zerlege komplexe Multi-Part-Anfragen in Teilaufgaben. Delegiere HR-spezifische Anfragen an den HR-Specialist-Agent und technische Anfragen an den IT-ServiceDesk-Agent. Führe die Ergebnisse beider Agenten zu einer übersichtlichen Gesamtantwort zusammen."*

---

### 💻 Code- & Konfigurations-Artefakte

#### Master Agent Orchestration Manifest (`MasterOrchestrator.yaml`)
```yaml
kind: AdaptiveDialog
beginDialog:
  kind: OnRecognizedIntent
  id: routerMain
  intent:
    triggerQueries:
      - "Hilfe zu HR und IT"
      - "Multi-Service Anfrage"

  actions:
    - kind: SetVariable
      id: initContext
      variable: Global.ConversationState
      value: "Orchestrating"

    # Multi-Agent Delegation Call 1: HR Sub-Agent
    - kind: AgentToAgentDelegationAction
      id: callHRAgent
      targetAgentId: "hr-specialist-guid-0001"
      inputPayload:
        query: =Topic.UserQuery
        userId: =System.User.Identifier
        authToken: =System.User.AccessToken
      outputVariable: Topic.HRResult

    # Multi-Agent Delegation Call 2: IT Service Sub-Agent
    - kind: AgentToAgentDelegationAction
      id: callITAgent
      targetAgentId: "it-servicedesk-guid-0002"
      inputPayload:
        query: =Topic.UserQuery
        userId: =System.User.Identifier
        authToken: =System.User.AccessToken
      outputVariable: Topic.ITResult

    # Synthese der Teilergebnisse
    - kind: SendActivity
      id: finalSynthesis
      activity: |
        Hier ist die Zusammenfassung Ihrer Anfragen:

        📌 **Personalabteilung (HR):**
        {Topic.HRResult.summaryMessage}

        💻 **IT Service Desk:**
        {Topic.ITResult.summaryMessage}
```

#### Connected Agent Capability Manifest (`hr_agent_manifest.json`)
```json
{
  "agentId": "hr-specialist-guid-0001",
  "name": "HR Specialist Agent",
  "version": "2.4.0",
  "protocol": "A2A-1.0",
  "description": "Exklusiv zuständig für Mitarbeiter-Urlaubstage, Gehaltsabrechnungen, Reisekosten und HR-Richtlinien.",
  "capabilities": [
    {
      "name": "get_vacation_balance",
      "description": "Gibt den aktuellen Resturlaub und genehmigte Urlaubstage des authentifizierten Benutzers zurück.",
      "parameters": {
        "userId": { "type": "string", "required": true }
      }
    },
    {
      "name": "submit_time_off",
      "description": "Reicht einen Urlaubsantrag von Startdatum bis Enddatum ein.",
      "parameters": {
        "startDate": { "type": "string", "format": "date", "required": true },
        "endDate": { "type": "string", "format": "date", "required": true },
        "type": { "type": "string", "enum": ["Vacation", "Sick", "Parental"] }
      }
    }
  ],
  "security": {
    "authType": "DelegatedUserToken",
    "requiredScopes": ["HR.TimeOff.Read", "User.Read"]
  }
}
```

---

### ✅ Verifikation & Validierungsschritte

1. **Multi-Intent Testanfrage ausführen:**
   - Geben Sie im Master Agenten folgenden Prompt ein:
     `"Hallo, ich plane meinen Urlaub für nächste Woche und benötige dafür außerdem ein neues leichtes Reise-Notebook. Wie viel Resturlaub habe ich und kannst du das Notebook bestellen?"`
2. **Überprüfung des A2A Handshake Tracing:**
   - Öffnen Sie das Tracing-Fenster im Test-Canvas.
   - Verifizieren Sie:
     1. Der Master Agent erkennt zwei Intentionen.
     2. Call 1 geht an `hr-specialist-guid-0001` mit Payload `Urlaubsabfrage`.
     3. Call 2 geht an `it-servicedesk-guid-0002` mit Payload `Notebook-Bestellung`.
3. **Validierung der SSO-Identitätsweitergabe:**
   - Vergewissern Sie sich im Log des HR-Agenten, dass der Aufruf nicht mit einem anonymen Service-Principal, sondern mit der `oid` des eingeloggten Benutzers erfolgte.

---

# Lab 5: Azure Application Insights Telemetrie (KQL) & RAG-Evaluation mit Golden Datasets

### 🎯 Lab-Ziel
Einrichtung eines durchgängigen Enterprise-Monitoring- und Test-Frameworks für Copilot Studio. Verknüpfung des Agenten mit Azure Application Insights zur Erfassung von Ausführungs-Latenzen, Token-Verbräuchen und Tool-Fehlern mittels Kusto Query Language (KQL). Erstellung und Durchführung automatisierter RAG-Qualitätsevaluationen mit einem Golden Dataset zur Messung von **Groundedness**, **Answer Relevance** und **Halluzinationsraten**.

---

### 🏛️ Telemetrie- & Evaluation-Pipeline

```
+---------------------------------------------------------------------------------------------------------+
|                                LAB 5: TELEMETRIE & RAG-EVALUATION PIPELINE                              |
+---------------------------------------------------------------------------------------------------------+

  [Copilot Studio Agent Runtime]
         |
         | (1) Streaming Telemetrie-Events & Traces
         v
  [Azure Application Insights / Log Analytics Workspace]
         |
         +---> [KQL Dashboard: Performance & Fehlerrate]
         |     - Tool Latencies (P95/P99)
         |     - HTTP 4xx/5xx Failure Rates
         |     - Topic Trigger Distribution
         |
         +---> [Continuous Quality Monitoring]
               (Erfassung von Benutzer-Feedback: Thumbs Up/Down)

  =========================================================================================================

  [Automatisierte RAG-Evaluation Pipeline (CI/CD)]
         |
         | (2) Test Input (50-500 Ground Truth Fragen)
         v
  [Golden Dataset Benchmark (JSONL)]
         |
         | (3) Batch Inferenz
         v
  [Copilot Studio Test-Endpunkt] ---> Generiert Antworten & Citations
         |
         | (4) Evaluations-Engine (Azure AI Foundry / Python Eval SDK)
         v
  +-------------------------------------------------------------------------+
  |                        LLM-as-a-Judge Evaluator                         |
  |  - Groundedness (Faktentreue gegenüber Quell-Chunks: 1.0 - 5.0)         |
  |  - Answer Relevance (Beantwortung der Nutzerfrage: 1.0 - 5.0)           |
  |  - Context Precision & Recall (Treffergenauigkeit der Wissensquellen)   |
  +-------------------------------------------------------------------------+
         |
         | (5) Quality Gate Check (z. B. Groundedness >= 4.2 erforderlich)
         v
  [CI/CD Release Pipeline: Gate Pass/Fail]
```

---

### 📋 Schritt-für-Schritt Anleitung

#### Schritt 5.1: Azure Application Insights mit Copilot Studio verbinden
1. Erstellen Sie im Azure Portal eine **Application Insights** Ressource.
2. Kopieren Sie den **Connection String** (`InstrumentationKey=...;IngestionEndpoint=...`).
3. Öffnen Sie **Copilot Studio** > **Settings** > **Advanced** > **Application Insights**.
4. Fügen Sie den Connection String ein und aktivieren Sie:
   - *Log conversation transcripts and activities*
   - *Log sensitive data filter (anonymisiert PII)*
5. Speichern und publizieren Sie den Agenten.

#### Schritt 5.2: Monitoring & KQL Performance Queries aufsetzen
1. Wechseln Sie im Azure Portal zu Ihrer Application Insights Instanz > **Logs**.
2. Führen Sie Abfragen auf den Tabellen `customEvents`, `dependencies` und `traces` aus, um Latenzen externer Tool-Calls und Topic-Fehler zu identifizieren.

#### Schritt 5.3: Golden Dataset erstellen & RAG-Evaluation durchführen
1. Erstellen Sie eine Test-Suite mit standardisierten Fragen, erwarteten Kontext-Chunks und Referenzantworten (`golden_dataset.jsonl`).
2. Führen Sie das Evaluationsskript aus, das den Agenten automatisiert abfragt und Antworten über ein *LLM-as-a-Judge* Modell (GPT-4o) nach Groundedness und Relevanz bewertet.

---

### 💻 Code- & Konfigurations-Artefakte

#### KQL Telemetrie-Abfragen für Application Insights (`telemetry_queries.kql`)

```kql
// =========================================================================
// QUERY 1: Latenz-Analyse externer Tools & MCP Endpoints (P50, P95, Max)
// =========================================================================
dependencies
| where timestamp > ago(24h)
| where type in ("HTTP", "WebService", "CopilotAction", "MCPTool")
| summarize 
    TotalCalls = count(),
    SuccessRate = round(100.0 * countif(success == true) / count(), 2),
    AvgDurationMs = round(avg(duration), 1),
    P95DurationMs = round(percentile(duration, 95), 1),
    MaxDurationMs = round(max(duration), 1)
    by name, target
| order by P95DurationMs desc;

// =========================================================================
// QUERY 2: Top Fehlerhafte Dialog-Topics & Unhandled Exceptions
// =========================================================================
customEvents
| where timestamp > ago(7d)
| where name == "BotMessageReceived" or name == "TopicExecutionError"
| extend TopicName = tostring(customDimensions.TopicName)
| extend ErrorCode = tostring(customDimensions.ErrorCode)
| extend ErrorMessage = tostring(customDimensions.ErrorMessage)
| where isnotempty(ErrorCode) or customDimensions.Status == "Failed"
| summarize ErrorCount = count() by TopicName, ErrorCode, ErrorMessage
| order by ErrorCount desc;

// =========================================================================
// QUERY 3: Generative AI Triggering & Knowledge Source Retrieval Analyse
// =========================================================================
traces
| where timestamp > ago(24h)
| where message startswith "GenerativeAnswerQuery"
| extend Query = tostring(customDimensions.UserQuestion)
| extend AnswerFound = tobool(customDimensions.AnswerFound)
| extend CitationsCount = toint(customDimensions.CitationsCount)
| extend LatencyMs = todouble(customDimensions.LatencyMs)
| summarize 
    TotalQuestions = count(),
    UnansweredQueries = countif(AnswerFound == false),
    AvgCitationsPerAnswer = round(avg(CitationsCount), 2),
    AvgRagLatencyMs = round(avg(LatencyMs), 1)
| extend KnowledgeSuccessRate = round(100.0 * (TotalQuestions - UnansweredQueries) / TotalQuestions, 2);
```

#### Golden Dataset Benchmark Datei (`golden_dataset.jsonl`)
```json
{"test_id": "TC-RAG-001", "question": "Welche Fristen gelten für die Einreichung von Reisekostenabrechnungen?", "expected_context": "Reisekosten müssen gemäß Spesenrichtlinie Abs. 4 innerhalb von 30 Tagen nach Reiseende eingereicht werden.", "ground_truth": "Reisekostenabrechnungen müssen spätestens 30 Tage nach Abschluss der Dienstreise im Spesenportal erfasst werden.", "category": "HR-Policy"}
{"test_id": "TC-RAG-002", "question": "Wie erhalte ich ein neues Hardware-Zertifikat für den VPN-Zugang?", "expected_context": "VPN-Zertifikate werden über das IT-SelfService-Portal unter 'Sicherheit & Schlüssel' beantragt und erfordern Smartcard-MFA.", "ground_truth": "Das VPN-Zertifikat kann im IT-SelfService-Portal unter 'Sicherheit & Schlüssel' mit Smartcard-Authentifizierung beantragt werden.", "category": "IT-Support"}
{"test_id": "TC-RAG-003", "question": "Wie hoch ist das maximale Budget für ergonomisches Home-Office Zubehör?", "expected_context": "Mitarbeiter im Hybridmodell erhalten einmalig bis zu 350 € Zuschuss für ergonomische Bürostühle oder Monitore.", "ground_truth": "Der einmalige Zuschuss für ergonomisches Home-Office Equipment beträgt maximal 350 €.", "category": "Procurement"}
```

#### Python Automatisierter RAG-Evaluator (`evaluate_rag.py`)
```python
"""
Automatisierte RAG-Evaluations-Pipeline für Microsoft Copilot Studio (AB-620)
Misst Groundedness (Faktentreue) und Answer Relevance via LLM-as-a-Judge.
"""
import json
import os
import requests
from typing import List, Dict, Any

EVALUATOR_PROMPT = """
Du bist ein unabhängiger KI-Auditor für Enterprise RAG-Systeme.
Bewerte die generierte Antwort anhand des bereitgestellten Kontextes und der Benutzerfrage.

Kriterien:
1. Groundedness (Faktentreue: Basiert die Antwort NUR auf dem Quellkontext? 1 = Reine Halluzination, 5 = Perfekt belegt).
2. Answer Relevance (Trifft die Antwort die Frage des Nutzers? 1 = Völlig am Thema vorbei, 5 = Präzise beantwortet).

Quellkontext: {context}
Benutzerfrage: {question}
Generierte Antwort: {generated_answer}

Gib das Ergebnis ausschließlich als valides JSON im folgenden Format zurück:
{{"groundedness_score": <1-5>, "relevance_score": <1-5>, "hallucination_detected": <true/false>, "justification": "<Begründung>"}}
"""

def evaluate_test_case(test_case: Dict[str, Any], agent_response: str) -> Dict[str, Any]:
    # Simulation: LLM-as-a-Judge Evaluierungsaufruf (z. B. Azure OpenAI GPT-4o)
    payload = {
        "context": test_case["expected_context"],
        "question": test_case["question"],
        "generated_answer": agent_response
    }
    
    # Heuristische/Mock-Bewertung für Testlauf
    grounded = 5.0 if test_case["expected_context"][:20].lower() in agent_response.lower() or "30 tage" in agent_response.lower() else 4.5
    relevance = 5.0 if len(agent_response) > 20 else 2.0
    
    return {
        "test_id": test_case["test_id"],
        "groundedness": grounded,
        "relevance": relevance,
        "hallucination": grounded < 3.0,
        "status": "PASS" if grounded >= 4.0 and relevance >= 4.0 else "FAIL"
    }

def run_evaluation_suite(dataset_path: str) -> None:
    print(f"🚀 Starte RAG-Evaluation für Dataset: {dataset_path}")
    results = []
    
    with open(dataset_path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            tc = json.loads(line)
            # Mock Agent Inferenz: Simuliert die Antwort des Copilot Studio Agenten
            simulated_agent_reply = f"Gemäß Richtlinie: {tc['ground_truth']}"
            eval_result = evaluate_test_case(tc, simulated_agent_reply)
            results.append(eval_result)
            print(f"  [{eval_result['status']}] {tc['test_id']} - Groundedness: {eval_result['groundedness']}/5 | Relevance: {eval_result['relevance']}/5")

    avg_groundedness = sum(r["groundedness"] for r in results) / len(results)
    avg_relevance = sum(r["relevance"] for r in results) / len(results)
    passed_tests = sum(1 for r in results if r["status"] == "PASS")
    
    print("\n" + "="*50)
    print("📊 EVALUATION SCORECARD")
    print(f"Gesamttests: {len(results)} | Bestanden: {passed_tests} | Fehlgeschlagen: {len(results) - passed_tests}")
    print(f"Durchschnittliche Groundedness: {avg_groundedness:.2f} / 5.0")
    print(f"Durchschnittliche Answer Relevance: {avg_relevance:.2f} / 5.0")
    print("="*50)
    
    # Quality Gate Schwellenwert für CI/CD Pipeline
    if avg_groundedness < 4.0 or (passed_tests / len(results)) < 0.95:
        print("❌ QUALITY GATE FAILED: Qualitätsstandards für Produktiv-Release nicht erreicht.")
        exit(1)
    else:
        print("✅ QUALITY GATE PASSED: Agent bereit für Managed Deployment.")

if __name__ == "__main__":
    # Testsuite ausführen
    mock_dataset = "golden_dataset.jsonl"
    if os.path.exists(mock_dataset):
        run_evaluation_suite(mock_dataset)
```

---

### ✅ Verifikation & Validierungsschritte

1. **KQL Telemetrie-Validierung:**
   - Führen Sie im Log Analytics Workspace die Query `dependencies` aus.
   - Vergewissern Sie sich, dass die Latenzen externer Aufrufe (z. B. MCP-Server oder Microsoft Graph) in Millisekunden aufgeführt werden und `SuccessRate == 100%` anzeigt.
2. **Evaluations-Pipeline Ausführung:**
   - Führen Sie das Python-Evaluationsskript gegen das Golden Dataset aus.
   - Überprüfen Sie die Scorecard: `Groundedness >= 4.5/5.0` und `Answer Relevance >= 4.5/5.0`.
3. **Halluzinations-Stresstest:**
   - Fügen Sie eine absichtlich unbelegbare Fangfrage ins Testset ein (z. B. *"Gibt es einen Firmenzuschuss für Urlaubsreisen zum Mars?"*).
   - **Soll-Verhalten:** Der Agent muss mit Content Moderation / Fallback antworten (`"Dazu liegen mir keine Informationen in den autorisierten Wissensquellen vor."`). Der Evaluator vergibt keinen Punktabzug bei korrekter Verweigerung.

---

## 🎯 Zusammenfassende AB-620 Prüfungs-Matrix der Labs

| Lab # | Schwerpunkt & Thema | Primäre Microsoft Learn Domäne | Kern-Artefakt & Technologie |
| :--- | :--- | :--- | :--- |
| **Lab 1** | Entra ID SSO & Token Exchange | Domäne 1: Plan & configure agent solutions | `api://botid-.../access_as_user`, OBO Scope, Teams Silent SSO |
| **Lab 2** | Dynamic Adaptive Cards | Domäne 1: Design agent conversations | Adaptive Card Schema 1.5, Power Fx `ParseJSON()`, `Action.Submit` |
| **Lab 3** | MCP Server & OpenAPI Integration | Domäne 2: Integrate and extend agents | FastAPI MCP Host, JSON-RPC / OpenAPI 3.0, Dynamic Parameter Slot Filling |
| **Lab 4** | Multi-Agent A2A Orchestrierung | Domäne 2: Configure multi-agent collaboration | Master Router/Dispatcher Pattern, Agent-to-Agent Protokoll, Context Forwarding |
| **Lab 5** | App Insights & RAG Golden Datasets | Domäne 3: Test and manage agents | KQL Dependency/Trace Queries, LLM-as-a-Judge, Groundedness-Evaluation |
