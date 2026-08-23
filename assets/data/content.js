/* AB-620 Wissensdatenbank – Microsoft Copilot Studio AI Agent Zertifizierung */
const AB620_CONTENT = {
  "domains": [
    {
      "id": "d1",
      "title": "Plan and configure agent solutions",
      "weightPercent": "30-35%",
      "description": "Planung von Agentenlösungen: Identität, Kanäle, Governance, Responsible AI und wiederverwendbare Komponenten."
    },
    {
      "id": "d2",
      "title": "Integrate and extend agents in Copilot Studio",
      "weightPercent": "40-45%",
      "description": "Integration von Wissensquellen, Tools, Multi-Agent-Zusammenarbeit und Azure-Diensten in Copilot Studio."
    },
    {
      "id": "d3",
      "title": "Test and manage agents",
      "weightPercent": "20-25%",
      "description": "Testen, Evaluieren und Verwalten von Agenten über den gesamten Lebenszyklus (ALM)."
    }
  ],
  "subDomains": [
    {
      "id": "d1-sub-identitaet-authentifizierung",
      "domainId": "d1",
      "title": "Identität & Authentifizierung"
    },
    {
      "id": "d1-sub-governance-dlp",
      "domainId": "d1",
      "title": "Governance & DLP"
    },
    {
      "id": "d1-sub-responsible-ai",
      "domainId": "d1",
      "title": "Responsible AI"
    },
    {
      "id": "d1-sub-kanaele-bereitstellung",
      "domainId": "d1",
      "title": "Kanäle & Bereitstellung"
    },
    {
      "id": "d1-sub-agent-flows",
      "domainId": "d1",
      "title": "Agent Flows"
    },
    {
      "id": "d1-sub-topics-variablen",
      "domainId": "d1",
      "title": "Topics & Variablen"
    },
    {
      "id": "d1-sub-adaptive-cards-generative-antworten",
      "domainId": "d1",
      "title": "Adaptive Cards & generative Antworten"
    },
    {
      "id": "d1-sub-wiederverwendbare-komponenten",
      "domainId": "d1",
      "title": "Wiederverwendbare Komponenten"
    },
    {
      "id": "d2-sub-wissensquellen",
      "domainId": "d2",
      "title": "Wissensquellen"
    },
    {
      "id": "d2-sub-tools-mcp",
      "domainId": "d2",
      "title": "Tools & MCP"
    },
    {
      "id": "d2-sub-tools-computer-use",
      "domainId": "d2",
      "title": "Tools & Computer Use"
    },
    {
      "id": "d2-sub-tools-rest-apis",
      "domainId": "d2",
      "title": "Tools & REST APIs"
    },
    {
      "id": "d2-sub-tools-konnektoren",
      "domainId": "d2",
      "title": "Tools & Konnektoren"
    },
    {
      "id": "d2-sub-multi-agent-a2a",
      "domainId": "d2",
      "title": "Multi-Agent & A2A"
    },
    {
      "id": "d2-sub-azure-integration",
      "domainId": "d2",
      "title": "Azure-Integration"
    },
    {
      "id": "d2-sub-azure-integration-monitoring",
      "domainId": "d2",
      "title": "Azure-Integration & Monitoring"
    },
    {
      "id": "d3-sub-testing-evaluation",
      "domainId": "d3",
      "title": "Testing & Evaluation"
    },
    {
      "id": "d3-sub-alm-deployment",
      "domainId": "d3",
      "title": "ALM & Deployment"
    },
    {
      "id": "d3-sub-monitoring-analytics",
      "domainId": "d3",
      "title": "Monitoring & Analytics"
    }
  ],
  "learningItems": [
    {
      "id": "d1-001",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Authentifizierungsoptionen im Überblick",
      "content": "Authentifizierung bedeutet, dass sich Nutzer anmelden müssen, damit ein Agent Zugriff auf geschützte Ressourcen oder Informationen erhält. In Copilot Studio wählt man dafür unter Settings > Security > Authentication eine von drei Optionen: 'Keine Authentifizierung', 'Mit Microsoft authentifizieren' oder 'Manuell authentifizieren'. Diese Auswahl ist wichtig, weil sie festlegt, wer mit dem Agenten sprechen darf und auf welche Daten er zugreifen kann - ein zentrales Sicherheits- und Governance-Thema. Nutzer können sich dabei über Microsoft Entra ID oder einen beliebigen OAuth2-Identitätsanbieter wie Google oder Facebook anmelden. Besonders wichtig für die Praxis: Änderungen an der Authentifizierungskonfiguration werden erst wirksam, nachdem der Agent erneut veröffentlicht wurde, weshalb solche Änderungen vorausschauend geplant werden müssen. Zusätzlich gilt eine Einschränkung bei der Power-BI-Integration: Agenten mit Microsoft-Authentifizierung (Entra ID) können nicht über iframe-basierte Visuals in Power-BI-Berichte eingebettet werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
      "sourceTitle": "Configure user authentication in Copilot Studio"
    },
    {
      "id": "d1-002",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Keine Authentifizierung – Risiken",
      "content": "Die Option 'Keine Authentifizierung' bedeutet, dass der Agent beim Chatten keine Anmeldung verlangt und somit jede Person, die den Link kennt oder ihn zum Beispiel auf einer Webseite findet, direkt mit dem Bot interagieren kann. Das ist der Standard für klassische Chatbots, birgt aber Risiken, da ein unauthentifizierter Agent ausschließlich auf öffentliche Informationen und Ressourcen zugreifen darf und sich nicht steuern lässt, wer aus der eigenen Organisation ihn nutzt. Microsoft empfiehlt deshalb ausdrücklich, Authentifizierung zu aktivieren, sobald der Agent innerhalb einer Organisation oder für bestimmte Nutzer eingesetzt wird, kombiniert mit weiteren Sicherheits- und Governance-Kontrollen. Im AB-620-Kontext ist relevant, dass diese Option gar nicht erst wählbar ist, wenn im Power Platform Admin Center eine Data Policy konfiguriert wurde, die Authentifizierung zwingend vorschreibt - Governance-Vorgaben auf Plattformebene überstimmen also die Einstellung auf Agentenebene. Damit zeigt sich, wie Authentifizierungskonfiguration und zentrale Data-Loss-Prevention-Richtlinien zusammenspielen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
      "sourceTitle": "Configure user authentication in Copilot Studio"
    },
    {
      "id": "d1-003",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Authentifizierung mit Microsoft",
      "content": "Bei der Option 'Authenticate with Microsoft' richtet Copilot Studio automatisch eine Microsoft-Entra-ID-Authentifizierung für den Teams-Kanal ein, ohne dass eine manuelle Konfiguration von App-Registrierungen oder Zertifikaten nötig ist. Das ist praktisch, weil Teams-Nutzer bereits über ihre Organisationsanmeldung identifiziert sind und daher nicht erneut zur Anmeldung aufgefordert werden, solange der Agent keinen erweiterten Berechtigungsumfang benötigt. Diese Option ist jedoch eng begrenzt: Sie funktioniert nur mit dem Kanal 'Teams + Microsoft 365' (sowie nativen und Custom-App-Kanälen) und steht bei Agenten, die mit Dynamics 365 Customer Service integriert sind, nicht zur Verfügung. In der Themen-Autoring-Oberfläche stehen dabei nur die Variablen User.ID und User.DisplayName zur Verfügung; Variablen wie User.AccessToken oder User.IsLoggedIn fehlen. Wer den Agenten auch außerhalb von Teams veröffentlichen oder ein Zugriffstoken benötigen möchte, muss stattdessen 'Authenticate manually' verwenden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
      "sourceTitle": "Configure user authentication in Copilot Studio"
    },
    {
      "id": "d1-004",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Manuelle Authentifizierung – Variablen und Anbieter",
      "content": "Die Option 'Authenticate manually' gibt Autor:innen deutlich mehr Kontrolle über den Anmeldevorgang als die automatische Microsoft-Authentifizierung, weil sie beliebige Kanäle unterstützt und zusätzliche Informationen über den angemeldeten Nutzer bereitstellt. In der Themen-Autoring-Oberfläche stehen dabei die Variablen User.Id, User.DisplayName, User.AccessToken und User.IsLoggedIn zur Verfügung, sodass Themen beispielsweise prüfen können, ob ein Nutzer angemeldet ist, oder ein Zugriffstoken für nachgelagerte API-Aufrufe nutzen können. Als Service Provider werden unter anderem Microsoft Entra ID V2 mit federated credentials, mit Zertifikaten oder mit Client Secrets sowie generisches OAuth2 für beliebige OAuth2-konforme Identitätsanbieter unterstützt. Wichtig ist, dass Änderungen an der Authentifizierung erst nach der Veröffentlichung wirksam werden und dass Administrator:innen diese Option über eine entsprechende Power-Platform-Kontrolle sperren können, sodass sie in Copilot Studio nicht mehr aktiviert oder deaktiviert werden kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
      "sourceTitle": "Configure user authentication in Copilot Studio"
    },
    {
      "id": "d1-005",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Steuerung des Chat-Zugriffs je nach Authentifizierungstyp",
      "content": "Ob und wie sich per Agent Sharing steuern lässt, wer in der Organisation mit einem Agenten chatten darf, hängt von der Kombination aus gewähltem Authentifizierungstyp und der Einstellung 'Require users to sign in' ab. Bei 'No authentication' kann grundsätzlich jede Person mit Zugriff auf den Link chatten, und dies lässt sich nicht einschränken - Agent Sharing hat hier keinen Steuerungseffekt. Bei 'Authenticate with Microsoft' ist die Anmeldung immer aktiv (der Nutzer ist ja bereits in Teams angemeldet), sodass 'Require users to sign in' nicht abschaltbar ist und Agent Sharing genutzt werden kann, um den Nutzerkreis in der Organisation zu begrenzen. Bei 'Authenticate manually' kommt es auf den Service Provider an: Mit Microsoft Entra ID lässt sich über 'Require users to sign in' der Zugriff gezielt auf bestimmte Organisationsmitglieder einschränken, während bei generischem OAuth2 zwar An- oder Abmeldepflicht umschaltbar ist, eine Einschränkung auf bestimmte Nutzer über Agent Sharing aber nicht möglich ist. Wenn die Authentifizierungseinstellung keine Zugriffskontrolle erlaubt, weist Copilot Studio beim Teilen des Agenten ausdrücklich darauf hin, dass jede Person chatten kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication",
      "sourceTitle": "Configure user authentication in Copilot Studio"
    },
    {
      "id": "d1-006",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Federated Credentials als empfohlene Methode",
      "content": "Federated Identity Credentials (FIC) sind eine Methode, bei der Copilot Studio automatisch und standardmäßig in der Azure App Registration eine Vertrauensbeziehung einrichtet, sodass die Authentifizierung mit kurzlebigen OpenID-Connect-Token statt mit dauerhaft gespeicherten Geheimnissen (Client Secrets) erfolgt. Das ist wichtig, weil gespeicherte Secrets ein Sicherheitsrisiko darstellen: Sie können gestohlen, versehentlich geteilt oder vergessen werden und laufen typischerweise erst nach längerer Zeit ab. FIC reduziert dieses Risiko, indem keine Secrets mehr gespeichert werden müssen, und folgt damit den Zero-Trust-Sicherheitsprinzipien von Microsoft. In der Praxis wählt man dazu in Copilot Studio unter 'Authenticate manually' den Service Provider 'Microsoft Entra ID V2 with federated credentials', trägt die Client-ID der zuvor erstellten App-Registrierung ein und richtet anschließend in Azure die Federated-Credential-Werte (Issuer und Value) ein, die Copilot Studio bereitstellt. Client Secrets sollten laut Microsoft nur dann genutzt werden, wenn federated credentials aus technischen Gründen nicht einsetzbar sind.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad",
      "sourceTitle": "Configure user authentication with Microsoft Entra ID"
    },
    {
      "id": "d1-007",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Redirect-URI für Bot Framework",
      "content": "Bei der Einrichtung einer App-Registrierung in Azure für die Entra-ID-Authentifizierung eines Copilot-Studio-Agenten muss unter 'Authentication' eine Plattformkonfiguration vom Typ 'Web' hinzugefügt werden. Als Redirect-URI wird dabei https://token.botframework.com/.auth/web/redirect eingetragen (beziehungsweise die europäische Variante https://europe.token.botframework.com/.auth/web/redirect für europäische Umgebungen); diese Adresse lässt sich auch direkt aus dem Feld 'Redirect URL' in den Copilot-Studio-Sicherheitseinstellungen unter 'Authenticate manually' kopieren. Diese URI ist notwendig, damit der Anmeldevorgang nach erfolgreicher Authentifizierung korrekt zum Bot Framework zurückgeleitet wird - ohne sie würde der OAuth-Ablauf fehlschlagen. Zusätzlich müssen sowohl 'Access tokens (used for implicit flows)' als auch 'ID tokens (used for implicit and hybrid flows)' aktiviert werden, damit die für den Anmeldevorgang benötigten Tokenarten ausgestellt werden können. Dieser Schritt ist ein fester Bestandteil des Gesamtprozesses zur Einrichtung der Entra-ID-Authentifizierung und wird in Azure durchgeführt, während die restliche Konfiguration in Copilot Studio erfolgt.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad",
      "sourceTitle": "Configure user authentication with Microsoft Entra ID"
    },
    {
      "id": "d1-008",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Token Exchange URL für SSO / OBO",
      "content": "Die Token Exchange URL ist ein Konfigurationsfeld in den Copilot-Studio-Authentifizierungseinstellungen, das für Single Sign-On (SSO) benötigt wird. Sie ermöglicht den sogenannten On-Behalf-Of (OBO) Ablauf: Dabei tauscht der Dienst ein bereits vorhandenes OBO-Token gegen das eigentlich angeforderte Zugriffstoken aus, ohne dass der Nutzer sich erneut manuell anmelden muss. Das ist der technische Kern von SSO, weil es Nutzern erlaubt, sich einmal anzumelden (etwa auf einer Firmenwebsite oder in einer App) und danach automatisch auch beim Copilot-Studio-Agenten als angemeldet zu gelten. Praktisch wird dazu der in Azure unter 'Expose an API' kopierte Scope-Wert in das Feld 'Token exchange URL (required for SSO)' der Copilot-Studio-Sicherheitseinstellungen eingefügt. Ohne korrekt konfigurierte Token Exchange URL würde SSO nicht funktionieren und Nutzer müssten sich stattdessen jedes Mal manuell über einen Anmeldedialog authentifizieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad",
      "sourceTitle": "Configure user authentication with Microsoft Entra ID"
    },
    {
      "id": "d1-009",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Erforderliche Scopes für Datenquellen",
      "content": "Scopes bestimmen bei der OAuth2-basierten Authentifizierung, welche Rechte und welchen Zugriffsumfang ein angefordertes Zugriffstoken erhält - sie legen also fest, auf welche Daten und Aktionen ein authentifizierter Nutzer zugreifen darf. Für die Konfiguration der Authentifizierung in Copilot Studio sollten die Scopes stets mit 'profile openid' beginnen, ergänzt um datenquellenspezifische Scopes je nach Anwendungsfall. Für den Zugriff auf SharePoint werden beispielsweise 'Sites.Read.All Files.Read.All' benötigt, für Graph Connections 'ExternalItem.Read.All' und für strukturierte Dataverse-Daten 'https://[OrgURL]/user_impersonation'. Diese Scopes werden gemeinsam als durch Leerzeichen getrennte Liste im Scopes-Feld der Authentifizierungskonfiguration eingetragen, zum Beispiel 'profile openid Sites.Read.All Files.Read.All https://myorg123.com/user_impersonation'. Die korrekte Wahl der Scopes ist entscheidend, damit ein Agent nach erfolgreicher Anmeldung tatsächlich auf die gewünschten Datenquellen im Namen des Nutzers zugreifen kann, ohne unnötig weitreichende Berechtigungen anzufordern.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad",
      "sourceTitle": "Configure user authentication with Microsoft Entra ID"
    },
    {
      "id": "d1-010",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "SSO-Grundschritte",
      "content": "Single Sign-On (SSO) erlaubt es einem Copilot-Studio-Agenten, der auf einer Website oder in einer App eingebettet ist, Nutzer automatisch anzumelden, wenn diese sich bereits auf der Hostseite oder in der Host-App angemeldet haben - etwa wenn der Agent im firmeninternen Intranet läuft, in dem sich der Nutzer ohnehin schon eingeloggt hat. Das erspart Nutzern eine zusätzliche, redundante Anmeldung und verbessert damit die Nutzererfahrung erheblich. Microsoft beschreibt den SSO-Aufbau in fünf Grundschritten: zunächst die manuelle Authentifizierung mit Microsoft Entra ID für den Agenten aktivieren, danach eine eigene App-Registrierung in Entra ID für die Custom Canvas (die eingebettete Weboberfläche) erstellen, anschließend einen benutzerdefinierten Scope für den Agenten definieren, diesen Scope über die Token Exchange URL zur Agentenkonfiguration hinzufügen und schließlich den clientseitigen Code der Custom Canvas so konfigurieren, dass er SSO über die Microsoft Authentication Library (MSAL) unterstützt. Diese Schritte bauen aufeinander auf und setzen voraus, dass zuvor bereits die Entra-ID-Authentifizierung für den Agenten eingerichtet wurde.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso",
      "sourceTitle": "Configure single sign-on with Microsoft Entra ID"
    },
    {
      "id": "d1-011",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Unterstützte Kanäle für SSO",
      "content": "Nicht jeder Veröffentlichungskanal eines Copilot-Studio-Agenten unterstützt Single Sign-On, was bei der Kanalauswahl unbedingt berücksichtigt werden muss. Unterstützt werden aktuell die Custom Website, Microsoft Teams, SharePoint sowie Omnichannel for Customer Service (dort ausschließlich der Live-Chat-Kanal). Nicht unterstützt sind dagegen Azure-Bot-Service-Kanäle, die Demo-Website, Facebook, die Mobile App sowie Power-Apps-Portale. Wird der Agent über Microsoft Teams veröffentlicht, sind zusätzliche, spezielle Konfigurationsschritte für Teams-SSO notwendig; werden diese nicht korrekt befolgt, schlägt die Authentifizierung für Teams-Nutzer durchgängig fehl. Diese Kanalbeschränkungen sind wichtig zu kennen, damit bei der Planung eines Agenten frühzeitig klar ist, ob SSO im gewählten Bereitstellungsszenario überhaupt technisch möglich ist, oder ob stattdessen eine manuelle Anmeldung eingeplant werden muss.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso",
      "sourceTitle": "Configure single sign-on with Microsoft Entra ID"
    },
    {
      "id": "d1-012",
      "domainId": "d1",
      "subDomainId": "d1-sub-identitaet-authentifizierung",
      "topic": "Getrennte App-Registrierungen bei SSO",
      "content": "Für die Einrichtung von SSO mit einer eigenen Website sind zwei separate Azure-App-Registrierungen erforderlich, die unterschiedliche Aufgaben erfüllen. Die 'Authentication App Registration' ermöglicht die Microsoft-Entra-ID-Authentifizierung des Agenten selbst und wird nach der gleichen Anleitung erstellt wie bei der regulären Entra-ID-Authentifizierung. Die 'Canvas App Registration' hingegen ermöglicht SSO für die eigene, benutzerdefinierte Webseite (die Custom Canvas), auf der der Agent eingebettet ist. Microsoft weist ausdrücklich darauf hin, dass aus Sicherheitsgründen dieselbe App-Registrierung nicht gleichzeitig für den Agenten und für die Website wiederverwendet werden sollte, da dies unerwünschte Berechtigungsüberschneidungen zur Folge haben könnte. Diese Trennung stellt sicher, dass die Zugriffsrechte, die der Agent besitzt, von denen der Website-Anwendung sauber getrennt bleiben, was ein grundlegendes Sicherheitsprinzip bei der Identitäts- und Zugriffsverwaltung darstellt.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso",
      "sourceTitle": "Configure single sign-on with Microsoft Entra ID"
    },
    {
      "id": "d1-013",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Data Policies – Grundprinzip",
      "content": "Data Policies (auch Data Loss Prevention, DLP) sind Governance-Regeln im Power Platform Admin Center, die als Schutzmechanismen ('Guardrails') dienen und das Risiko verringern sollen, dass Nutzer unbeabsichtigt Unternehmensdaten preisgeben. Da Power Apps, Power Automate und Microsoft Copilot Studio Connectors nutzen, um Daten aus verschiedensten Quellen zu lesen, zu schreiben oder zu verarbeiten, erlauben Data Policies Administrator:innen, den Zugriff auf diese Connectors gezielt zu steuern. Wichtig ist die Unterscheidung zwischen Design-Zeit und Laufzeit: Verstößt ein Agent, eine App oder ein Flow gegen eine neu gesetzte Policy, wird die Ressource in einen gesperrten bzw. Quarantänezustand versetzt und kann nicht mehr betrieben werden, während gleichzeitig Verbindungen zu geblockten Connectors deaktiviert werden. Eine Richtlinienänderung wird zunächst zentral gespeichert und anschließend über alle Umgebungen im Tenant verteilt, wobei die betroffenen Ressourcen die neuen Vorgaben regelmäßig prüfen; die vollständige Durchsetzung kann bis zu 24 Stunden dauern, meist erfolgt sie jedoch innerhalb einer Stunde. Für Copilot Studio existieren dabei auch spezielle virtuelle Connectors, mit denen sich einzelne Funktionen von Copilots gezielt abschalten lassen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention",
      "sourceTitle": "Data policies - Power Platform"
    },
    {
      "id": "d1-014",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Virtuelle Connectors für Copilot Studio Governance",
      "content": "Connectors sind normalerweise stark typisierte Abbildungen echter RESTful-APIs, die es Makern erlauben, externe Dienste in Apps, Flows oder Agenten einzubinden. 'Virtuelle Connectors' sind ein Sonderfall: Sie tauchen zwar in Data Policies auf und lassen sich dort administrieren, basieren aber nicht auf einer echten API. Microsoft nutzt dieses Konzept, weil Data Policies eines der beliebtesten Governance-Werkzeuge in Power Platform sind, und stellt darüber gezielte 'An/Aus'-Schalter für einzelne Copilot-Studio-Funktionen bereit, etwa das Deaktivieren von nicht-authentifiziertem Chat. Für AB-620 ist wichtig zu wissen, dass Advanced Connector Policies (ACP) virtuelle Connectors nicht unterstützen und dies auch zukünftig nicht tun werden, da ACP sich ausschließlich auf echte zertifizierte Connectors konzentriert. Virtuelle Connectors für Copilot Studio entwickeln sich daher perspektivisch zu eigenen, dedizierten Governance-Regeln, getrennt von klassischen Data Policies und ACP.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention",
      "sourceTitle": "Data policies - Power Platform"
    },
    {
      "id": "d1-015",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Design-Time vs. Runtime bei DLP",
      "content": "Wenn ein Administrator per Data Policy den Zugriff auf einen Connector oder einzelne Aktionen einschränkt, wirkt sich das auf zwei unterschiedliche Phasen aus: die Design-Time und die Runtime. In der Design-Time-Phase, also während ein Maker eine App, einen Flow oder einen Agenten erstellt oder bearbeitet, verhindert eine blockierende Policy das Speichern, sobald ein gesperrter Connector verwendet wird - der Maker erhält direkt eine Fehlermeldung, dass der Connector durch die Policy blockiert ist. Anders bei der Runtime: Läuft eine App bereits oder wird ein Flow zu einem festen Zeitpunkt ausgeführt, wird die zugehörige Connection bei einer neuen, blockierenden Policy in einen inaktiven Zustand versetzt ('broken connection'), sodass die Ausführung mit einem Fehler abbricht. Dieser Prozess läuft über mehrere Schritte ab: Die Policy wird zentral gespeichert, an alle Umgebungen im Tenant verteilt, dort werden Ressourcen periodisch geprüft, bei Verstoß in einen Quarantäne-Zustand versetzt und betroffene Connections deaktiviert. Für Administratoren ist relevant, dass diese Durchsetzung je nach Anzahl der Umgebungen und Ressourcen bis zu 24 Stunden dauern kann, in den meisten Fällen aber innerhalb einer Stunde greift.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention",
      "sourceTitle": "Data policies - Power Platform"
    },
    {
      "id": "d1-016",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Standard-Datengruppe für neue Connectors",
      "content": "Data Policies ordnen Connectors einer von drei Datengruppen zu: Business, Non-Business oder Blocked. Connectors in derselben Gruppe dürfen untereinander Daten austauschen, Connectors aus unterschiedlichen Gruppen jedoch nicht - das ist der eigentliche Schutzmechanismus gegen unbeabsichtigten Datenabfluss. Erstellt ein Administrator eine neue Data Policy, werden zunächst alle Connectors automatisch der Gruppe 'Non-Business' zugewiesen, da dies die anfängliche Standardgruppe für neue Connectors und Dienste ist. Microsoft rät ausdrücklich davon ab, diese Standardgruppe zu ändern und empfiehlt, 'Non-Business' als Default beizubehalten, damit neu hinzukommende Dienste zunächst restriktiv eingestuft sind. Administratoren sollen Connectors erst nach Prüfung der Auswirkungen bewusst in die Gruppen 'Business' oder 'Blocked' verschieben, was in AB-620-Umgebungen ein zentraler Bestandteil eines soliden Governance-Prozesses ist.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/admin/dlp-connector-classification",
      "sourceTitle": "Connector classification - Power Platform"
    },
    {
      "id": "d1-017",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Nicht blockierbare Connectors",
      "content": "Um sicherzustellen, dass zentrale Kernszenarien der Power Platform immer funktionsfähig bleiben, lassen sich bestimmte Connectors über klassische Data Policies grundsätzlich nicht blockieren. Dazu gehören unter anderem Dataverse, Approvals, Notifications sowie der Copilot-Studio-Connector selbst, ebenso wie Microsoft-365-Enterprise-Standard-Connectors wie SharePoint, Microsoft Teams oder Excel Online. Diese Connectors können aber weiterhin als 'Business' oder 'Non-Business' klassifiziert werden, um zumindest den Datenaustausch mit anderen Diensten zu steuern - lediglich ein vollständiges Blockieren ist ausgeschlossen. Wer diese nicht blockierbaren Connectors dennoch einschränken möchte, muss auf Advanced Connector Policies (ACP) zurückgreifen, die nach einem strikten Allowlist-Modell arbeiten: Dort ist standardmäßig alles gesperrt, was nicht explizit erlaubt wurde, und ACP kann auch sonst nicht blockierbare zertifizierte Connectors einschränken. Für AB-620 bedeutet das, dass Governance-Konzepte oft eine Kombination aus klassischen Data Policies und ACP erfordern, um wirklich lückenlose Kontrolle zu erreichen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/admin/dlp-connector-classification",
      "sourceTitle": "Connector classification - Power Platform"
    },
    {
      "id": "d1-018",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "MCP-Connectors und DLP",
      "content": "Model Context Protocol (MCP) Connectors sind eine spezielle Connector-Klasse, die zusätzliche Metadaten bereitstellen, um MCP-fähige API-Endpunkte - sogenannte 'Tools' - verfügbar zu machen. Sie erweitern damit die klassische Connector-Funktionalität und ermöglichen reichhaltigere, agentenbasierte generative-KI-Erfahrungen in Copilot Studio, weil ein Agent so gezielt auf externe Tools zugreifen kann. Viele der nicht blockierbaren Connectors in der Power Platform unterstützen mittlerweile MCP, was bedeutet, dass ihre MCP-Server ebenfalls governance-relevant sind. Verwaltet und eingeschränkt werden diese MCP-Connectors und ihre Server über Advanced Connector Policies (ACP), nicht über klassische Data Policies. Für die AB-620-Praxis ist wichtig: Wird ein Power-Platform-Connector über eine Data Policy blockiert, sperrt das automatisch auch den Zugriff auf Tools in verbundenen MCP-Servern, da diese für ihre Konnektivität auf denselben Connector angewiesen sind.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention",
      "sourceTitle": "Data policies - Power Platform"
    },
    {
      "id": "d1-019",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Erzwungene Authentifizierung per Data Policy",
      "content": "Beim Erstellen eines neuen Agenten ist die Option 'Authenticate with Microsoft' standardmäßig aktiviert, wodurch automatisch Microsoft-Entra-ID-Authentifizierung greift und der Agent nur in Kanälen wie Microsoft Teams, SharePoint, Power Apps oder Microsoft 365 Copilot nutzbar ist. Agent-Ersteller können diese Vorgabe jedoch ändern und 'No authentication' wählen, wodurch jeder mit dem Link ohne Anmeldung mit dem Agenten chatten kann - ein potenzielles Sicherheitsrisiko, besonders wenn der Agent auf sensible Daten zugreift. Um dies organisationsweit zu unterbinden, kann ein Administrator eine Data Policy konfigurieren, die den virtuellen Connector 'Chat without Microsoft Entra ID authentication in Copilot Studio' blockiert. Ist diese Policy aktiv, stehen Agent-Erstellern nur noch 'Authenticate with Microsoft' oder 'Authenticate manually' zur Verfügung, und Nutzer müssen sich zwingend authentifizieren, bevor sie mit dem Agenten chatten können. Diese Maßnahme ist ein zentrales Beispiel dafür, wie Data Policies in Copilot Studio konkrete Sicherheitsanforderungen technisch durchsetzen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
      "sourceTitle": "Configure data policies for agents"
    },
    {
      "id": "d1-020",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Blockieren von Wissensquellen per Data Policy",
      "content": "Agenten in Copilot Studio können unterschiedliche Wissensquellen nutzen, etwa Dokumente, SharePoint- und OneDrive-Inhalte oder öffentliche Webseiten, um Antworten zu generieren. Da diese Quellen potenziell sensible oder unerwünschte Daten einbeziehen können, möchten Organisationen oft steuern, welche Quellentypen ihre Agent-Autoren überhaupt verwenden dürfen. Über Data Policies lassen sich dafür gezielt die virtuellen Connectors 'Knowledge source with SharePoint and OneDrive in Copilot Studio', 'Knowledge source with public websites and data in Copilot Studio' und 'Knowledge source with documents in Copilot Studio' blockieren, sodass Agent-Ersteller diese Quellentypen nicht mehr einbinden können. Wer nicht ganze Quellentypen sperren, sondern nur bestimmte Endpunkte erlauben oder verbieten möchte - etwa nur bestimmte SharePoint-Sites oder Webseiten -, kann alternativ Endpoint Filtering nutzen, statt den Connector vollständig zu blockieren. Für AB-620 zeigt dieses Beispiel, wie granular sich Governance über einzelne Funktionsbereiche eines Agenten steuern lässt.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
      "sourceTitle": "Configure data policies for agents"
    },
    {
      "id": "d1-021",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Blockieren von HTTP-Requests und Skills",
      "content": "Agent-Ersteller können über den HTTP-Request-Knoten eigene Aufrufe an beliebige externe Webdienste absetzen, was flexibel, aber auch riskant ist, da damit potenziell unkontrolliert Daten nach außen fließen können. Um dies zu verhindern, kann ein Administrator eine Data Policy konfigurieren, die den 'HTTP'-Connector blockiert, sodass Agenten mit HTTP-Request-Knoten nicht mehr veröffentlicht werden können. Wer nicht sämtliche HTTP-Aufrufe unterbinden, sondern nur bestimmte Ziel-Endpunkte erlauben oder verbieten möchte, kann stattdessen Endpoint Filtering einsetzen und damit gezielter steuern, welche externen Adressen erreichbar sind. Ergänzend dazu können Agenten auch mit sogenannten Skills erweitert werden, die zusätzliche Funktionalität bereitstellen; auch hier lässt sich per Data Policy steuern, welche Skills aus Sicherheitsgründen verwendet werden dürfen. Beide Mechanismen zeigen, dass Governance in Copilot Studio nicht nur pauschal blockieren, sondern über Endpoint Filtering auch feingranular differenzieren kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
      "sourceTitle": "Configure data policies for agents"
    },
    {
      "id": "d1-022",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "DLP-Enforcement seit 2025 tenantweit",
      "content": "Seit Anfang 2025 wird die Durchsetzung von Data Policies für alle Tenants verbindlich angewendet, wie im Message-Center-Alert MC973179 ('Copilot Studio - Upcoming updates to data loss prevention enforcement') angekündigt wurde. Zuvor gab es die Möglichkeit, einzelne Agenten von der Data-Policy-Durchsetzung auszunehmen (Enforcement Exemption); diese Ausnahmeregelung wird seit dieser Änderung nicht mehr unterstützt. Das bedeutet konkret, dass auch Agenten, die früher explizit von der Durchsetzung ausgenommen waren, nun vollständig den geltenden Data Policies unterliegen und bei Verstößen entsprechend blockiert oder in Quarantäne versetzt werden. Für Organisationen, die AB-620-Umgebungen betreiben, ist diese Änderung wichtig, weil sie überprüfen müssen, ob zuvor 'unsichtbar' funktionierende Agenten durch bestehende Data Policies plötzlich eingeschränkt werden. Bei auftretenden Problemen verweist Microsoft auf eigene Troubleshooting-Anleitungen zur Diagnose von Data-Policy-Durchsetzungsfehlern.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention",
      "sourceTitle": "Configure data policies for agents"
    },
    {
      "id": "d1-023",
      "domainId": "d1",
      "subDomainId": "d1-sub-responsible-ai",
      "topic": "Verantwortliche KI – Kernprinzipien",
      "content": "Ein KI-System besteht laut Microsoft nicht nur aus der Technologie selbst, sondern auch aus den Menschen, die es nutzen, den Menschen, die davon betroffen sind, und der Umgebung, in der es eingesetzt wird - deshalb müssen Agenten den Prinzipien verantwortlicher KI folgen. Copilot Studio orientiert sich dabei am Microsoft Responsible AI Standard mit vier Kernprinzipien: Fairness (faire Behandlung aller Nutzer durch diverse, repräsentative Trainingsdaten), Accountability (klare Rollen und Verantwortlichkeiten für Beteiligte am KI-Projekt), Transparency und Ethics. Transparenz bedeutet konkret, dass Nutzer wissen müssen, dass sie mit einem Agenten interagieren, der generative KI-Funktionen nutzt, und dass Organisationen klar kommunizieren sollen, warum eine KI-Lösung gewählt wurde und wie sie überwacht und aktualisiert wird. Ethik wiederum verlangt ein inklusives Team, frühzeitiges Einbeziehen diverser Communities sowie regelmäßige Prüfungen auf ethische Bedenken und Leistungsunterschiede über ein Governance-Framework mit regelmäßigen Audits. Diese Prinzipien sind wichtig, weil generative Modelle ohne sorgfältiges Design und durchdachte Absicherungen falsche oder sogar schädliche Inhalte erzeugen können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/responsible-ai",
      "sourceTitle": "Apply responsible AI principles"
    },
    {
      "id": "d1-024",
      "domainId": "d1",
      "subDomainId": "d1-sub-responsible-ai",
      "topic": "Bias-Erkennung und Human-in-the-Loop",
      "content": "Verzerrungen (Bias) in KI-Systemen entstehen häufig durch unausgewogene oder nicht repräsentative Trainingsdaten und können dazu führen, dass ein Agent bestimmte Nutzergruppen benachteiligt oder unfaire Antworten liefert. Um dem entgegenzuwirken, empfiehlt Microsoft, Trainingsdaten regelmäßig auf Verzerrungen und Ungleichgewichte zu prüfen und diverse, repräsentative Daten unterschiedlicher Demografien zu verwenden. Zusätzlich sollen Tools und Techniken wie statistische Analysen und Fairness-Metriken zur Bias-Erkennung eingesetzt werden, ergänzt durch Debiasing-Verfahren wie Resampling, Reweighting oder Adversarial Debiasing. Ein zentraler Baustein ist Human-in-the-Loop: Menschliche Überprüfung und Feedbackschleifen sollen Verzerrungen erkennen und korrigieren, die die KI selbst einbringt, während ein Ethik-Gremium oder Governance Board die KI-Entwicklung und den Einsatz überwacht und sicherstellt, dass ethische Standards eingehalten werden. Für AB-620 bedeutet dies, dass verantwortliche KI kein einmaliger Check, sondern ein kontinuierlicher Prozess mit klarer organisatorischer Verankerung ist.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/responsible-ai",
      "sourceTitle": "Apply responsible AI principles"
    },
    {
      "id": "d1-025",
      "domainId": "d1",
      "subDomainId": "d1-sub-responsible-ai",
      "topic": "Datenschutz und Zugriffskontrolle bei Responsible AI",
      "content": "Da ein Agent häufig mit sensiblen Unternehmensdaten arbeitet, ist Datenschutz ein zentraler Aspekt verantwortlicher KI in Copilot Studio. Microsoft setzt dabei auf serverseitige Verschlüsselungstechnologien, die organisatorische Inhalte sowohl im Ruhezustand als auch während der Übertragung schützen; Verbindungen werden über Transport Layer Security (TLS) abgesichert, und Datentransfers zwischen Dynamics 365, Power Platform und Azure OpenAI laufen über das Microsoft-Backbone-Netzwerk. Zugriffskontrolle ist ein weiterer Kernbaustein: Ein Agent erhält Daten nur basierend auf dem Zugriffslevel des jeweiligen aktuellen Nutzers, und rollenbasierte Zugriffskontrolle (RBAC) über Microsoft Entra ID stellt sicher, dass nur autorisierte Personen Zugriff haben - stets nach dem Prinzip der geringsten Rechte (Least Privilege), das den Zugriff auf das absolut Notwendige beschränkt. Ergänzend verlangt Microsoft die Einhaltung relevanter Datenschutzvorschriften wie DSGVO, HIPAA oder CCPA sowie regelmäßiges Monitoring und Auditing von Zugriff und Nutzung, um Sicherheitsvorfälle frühzeitig zu erkennen. Diese Maßnahmen zusammen bilden die technische Grundlage, damit KI-Agenten in AB-620-Umgebungen datenschutzkonform betrieben werden können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/responsible-ai",
      "sourceTitle": "Apply responsible AI principles"
    },
    {
      "id": "d1-026",
      "domainId": "d1",
      "subDomainId": "d1-sub-responsible-ai",
      "topic": "Kontinuierliches Monitoring als Responsible-AI-Praxis",
      "content": "Verantwortliche KI endet nicht mit dem Go-Live eines Agenten, sondern erfordert laufende Überwachung und Weiterentwicklung, da sich Nutzerverhalten, Daten und ethische Standards mit der Zeit ändern können. Microsoft empfiehlt deshalb, Feedback-Mechanismen zu etablieren, über die Nutzer Ungenauigkeiten oder Probleme melden können, damit diese Rückmeldungen genutzt werden, um Modelle zu verfeinern und zu verbessern. Parallel dazu sollen Organisationen mögliche Sicherheitsvorfälle erkennen und darauf reagieren, indem sie Zugriff und Nutzung des KI-Systems regelmäßig überwachen. Ein wichtiges Werkzeug dafür sind detaillierte Audit-Logs, die Zugriffe auf und Änderungen an Daten nachvollziehbar dokumentieren und damit sowohl Compliance-Nachweise als auch Fehleranalysen ermöglichen. Für AB-620 unterstreicht dieser Grundsatz, dass Governance ein fortlaufender Kreislauf aus Beobachten, Melden und Anpassen ist, nicht ein einmaliges Setup zum Projektstart.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/responsible-ai",
      "sourceTitle": "Apply responsible AI principles"
    },
    {
      "id": "d1-027",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Sicherheits- und Governance-Kontrollen im Überblick",
      "content": "Copilot Studio folgt einer Reihe von Sicherheits- und Governance-Praktiken, damit Organisationen kontrollieren können, wie Agenten gebaut, veröffentlicht und betrieben werden. Dazu gehören unter anderem der Agent Runtime Protection Status, mit dem Maker den Sicherheitsstatus ihrer Agenten einsehen können, sowie Data Policy Controls, mit denen Admins im Power Platform Admin Center Wissensquellen, Konnektoren, Authentifizierung und Veröffentlichungskanäle steuern. Vor der Veröffentlichung prüft ein automatischer Sicherheits-Scan ('Automatic security scan') die Konfiguration und liefert eine Echtzeit-Risikobewertung, damit Maker potenzielle Datenexfiltrations- oder Sicherheitsprobleme schon während der Entwicklung erkennen und beheben können. Zur Nachvollziehbarkeit protokolliert Copilot Studio Aktivitäten in Audit-Logs, die in Microsoft Purview für Admins einsehbar sind und zusätzlich in Microsoft Sentinel überwacht und mit Alarmen versehen werden können. Diese Kontrollen greifen ineinander: Sie sollen sicherstellen, dass Agenten regelkonform gebaut werden, Risiken vor dem Go-Live sichtbar sind und Betriebsereignisse im Nachhinein überprüfbar bleiben – zentrale Voraussetzungen für den unternehmensweiten Einsatz von Copilot-Studio-Agenten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance",
      "sourceTitle": "Key concepts - Copilot Studio security and governance"
    },
    {
      "id": "d1-028",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Microsoft Agent 365 als zentrale Kontrollebene",
      "content": "Microsoft Agent 365 ist eine zentrale Kontrollebene, mit der Organisationen ihre Copilot-Studio-Agenten übergreifend beobachten, regieren und absichern können, statt jede Governance-Maßnahme isoliert je Agent zu verwalten. Der Grund für diese zusätzliche Ebene: Mit wachsender Zahl an Agenten braucht es eine einheitliche Sicht auf Bestand, Besitzverhältnisse und Aktivität, ähnlich wie bei menschlichen Identitäten. Onboarden Organisationen ihre Agenten in Agent 365, werden diese als Identitäten in Microsoft Entra dargestellt und können dadurch mit vertrauten Sicherheitsmechanismen wie Conditional Access sowie rollen- und attributbasierten Zugriffskontrollen sowie Access-Governance-Workflows verwaltet werden. Admins nutzen Agent 365 damit für zentrale Sichtbarkeit und Richtliniendurchsetzung über alle Copilot-Studio-Agenten hinweg, zusätzlich zu den bestehenden Power-Platform- und Microsoft-365-Governance-Mechanismen. Für AB-620 ist relevant, dass Agent 365 die bisherigen, eher agentenspezifischen Kontrollen (Data Policies, Audit-Logs) um eine identitätsbasierte, unternehmensweite Steuerungsebene ergänzt.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance",
      "sourceTitle": "Key concepts - Copilot Studio security and governance"
    },
    {
      "id": "d1-029",
      "domainId": "d1",
      "subDomainId": "d1-sub-governance-dlp",
      "topic": "Deaktivierung von generativer KI-Veröffentlichung",
      "content": "Neben allgemeinen Data-Loss-Prevention-Funktionen bietet Copilot Studio gezielte Schalter, um generative KI-Funktionen zusätzlich einzuschränken, wenn eine Organisation dies aus Compliance- oder Risikogründen benötigt. Administratoren können im Power Platform Admin Center die Möglichkeit deaktivieren, Agenten mit generativen KI-Funktionen für den gesamten Tenant zu veröffentlichen – das verhindert, dass solche Agenten überhaupt produktiv nutzbar werden, unabhängig davon, wie sie konfiguriert sind. Ergänzend lässt sich die Datenbewegung über geografische Standorte hinweg für generative KI-Funktionen außerhalb der USA unterbinden, was insbesondere für Organisationen mit strengen Datenresidenzanforderungen wichtig ist. Diese Kontrollen existieren, weil generative KI-Funktionen (z. B. LLM-basierte Antworten) andere Datenverarbeitungs- und Risikoprofile haben als klassische, regelbasierte Bot-Logik. Im AB-620-Kontext zeigen diese Einstellungen, wie Governance nicht nur auf Agenten-, sondern auch auf Tenant-Ebene ansetzt, um generative Fähigkeiten organisationsweit steuerbar zu halten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance",
      "sourceTitle": "Key concepts - Copilot Studio security and governance"
    },
    {
      "id": "d1-030",
      "domainId": "d1",
      "subDomainId": "d1-sub-kanaele-bereitstellung",
      "topic": "Kanalübersicht für Veröffentlichung",
      "content": "Damit Kunden oder Mitarbeitende mit einem in Copilot Studio gebauten Agenten interagieren können, muss dieser zuerst veröffentlicht und dann an mindestens einen Kanal angebunden werden – erst danach ist er für Endnutzer erreichbar. Copilot Studio unterstützt dafür eine breite Palette an Kanälen: Teams und Microsoft 365 Copilot, SharePoint, WhatsApp, Facebook, mobile bzw. custom Apps sowie eine eigene Website über 'Custom Website' oder die interne Demo-Website zum Testen. Zusätzlich lassen sich über den Azure Bot Service weitere Kanäle wie Cortana, Slack, Telegram, Twilio, Line, Kik, GroupMe, Direct Line Speech und E-Mail anbinden. Jeder Kanal bietet dabei eine unterschiedliche Nutzererfahrung (z. B. bei Markdown-Unterstützung oder Mehrfachauswahl-Optionen), weshalb Agenten-Inhalte gegebenenfalls kanalspezifisch optimiert werden sollten. Für Copilot-Studio-Maker bedeutet das: Ein Agent wird einmal gebaut, kann aber über mehrere Kanäle gleichzeitig ausgerollt werden, wobei jede erneute Veröffentlichung automatisch auf allen verbundenen Kanälen aktualisiert wird.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels",
      "sourceTitle": "Publish and deploy your agent - Microsoft Copilot Studio"
    },
    {
      "id": "d1-032",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Agent Flows – Grundkonzept",
      "content": "Agent Flows sind Automatisierungen innerhalb von Copilot Studio, mit denen sich wiederkehrende Aufgaben automatisieren und Apps sowie Dienste integrieren lassen; sie bestehen immer aus einem Trigger und mindestens einer Aktion und können manuell, durch andere Ereignisse oder zeitgesteuert gestartet werden. Ein zentraler Vorteil ist ihre deterministische Ausführung: Sie folgen einem regelbasierten Pfad, sodass dieselbe Eingabe immer dieselbe Ausgabe erzeugt – das macht sie zuverlässig und vorhersehbar, im Gegensatz zu generativen, nicht-deterministischen Agentenantworten. Erstellt werden können Agent Flows in Copilot Studio auf zwei Arten: durch Beschreibung in natürlicher Sprache, wobei Copilot Studio die Absicht interpretiert und einen passenden Flow generiert, oder direkt im visuellen Drag-and-Drop-Designer, in dem Aktionen, Bedingungen und Schleifen zusammengestellt werden. Agent Flows verbrauchen dabei Copilot-Studio-Kapazität pro ausgeführter Aktion. Im AB-620-Kontext sind Agent Flows das Werkzeug für zuverlässige, regelgeleitete Prozessschritte, die als Ergänzung zu den eher gesprächsorientierten, generativen Fähigkeiten eines Agenten dienen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview",
      "sourceTitle": "Agent flows overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-033",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Agent Flows als Tools für Agenten",
      "content": "Damit ein Copilot-Studio-Agent während eines Gesprächs auf die Fähigkeiten eines Agent Flows zugreifen kann, muss dieser Flow den speziellen Trigger 'When an agent calls the flow' besitzen. Nur Flows mit diesem Trigger können als Tool zu einem Agenten hinzugefügt werden und stehen ihm dann als aufrufbare Fähigkeit innerhalb von Konversationen zur Verfügung. Das ist deshalb wichtig, weil es die deterministische, regelbasierte Ausführung eines Agent Flows mit der flexiblen, gesprächsgesteuerten Orchestrierung des Agenten verbindet: Der Agent kann so bei Bedarf zuverlässige Automatisierungsschritte (z. B. Daten abrufen, in ein System schreiben) auslösen, ohne dass die Kernlogik der Konversation dafür verändert werden muss. Für Copilot-Studio-Maker bedeutet dies eine klare Trennung von Zuständigkeiten: generative Orchestrierung im Agenten, verlässliche Ausführung im Agent Flow.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview",
      "sourceTitle": "Agent flows overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-034",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Request Information Action (Human-in-the-Loop)",
      "content": "Die 'Request information' (RFI) Aktion in Agent Flows dient dazu, menschliche Aufsicht in automatisierte Prozesse einzubauen, weil viele Automatisierungen und KI-Workflows an Punkten ankommen, an denen menschliches Urteilsvermögen nötig ist. Die Aktion pausiert die Ausführung des Flows, sammelt anschließend Eingaben von zugewiesenen menschlichen Prüfern und nutzt diese Eingaben dann in den nachfolgenden Schritten des Flows weiter – etwa um eine Schadensschätzung, eine Compliance-Prüfung oder eine fachliche Einschätzung einzuholen. Konfiguriert werden dabei ein Titel, eine Nachricht sowie die E-Mail-Adressen der zuständigen Personen; zusätzlich lassen sich verschiedene Eingabetypen wie Text, Ja/Nein, E-Mail, Zahl oder Datum definieren, die der Prüfer ausfüllen muss. Typische Einsatzszenarien sind Versicherungsschadenprüfung, Kreditvergabe-Compliance, Qualitätssicherung in der Lieferkette oder juristische Vertragsprüfung. Damit ist RFI das zentrale Human-in-the-Loop-Element in Agent Flows: Es stellt sicher, dass automatisierte Prozesse an kritischen Stellen von Menschen bestätigt oder ergänzt werden, bevor sie fortgesetzt werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information",
      "sourceTitle": "Request information from human review in agent flows"
    },
    {
      "id": "d1-035",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "RFI-Einschränkungen",
      "content": "Die Request-Information-Aktion hat einige wichtige technische Einschränkungen, die Maker beim Design ihrer Agent Flows kennen müssen. Werden mehrere Personen als Empfänger angegeben, wird ausschließlich die Antwort der ersten reagierenden Person im weiteren Flow verwendet – alle späteren Antworten werden ignoriert. Alle Anfragen werden derzeit ausschließlich über Outlook versendet; andere Plattformen werden aktuell nicht unterstützt. Zudem können Anfragen nicht an Personen außerhalb des eigenen Tenants gesendet werden, was den Einsatz auf interne Reviewer beschränkt. Diese Einschränkungen existieren, weil RFI in erster Linie für interne, unternehmensgebundene Freigabeprozesse konzipiert ist und nicht als allgemeines Kommunikationswerkzeug über Organisationsgrenzen hinweg. Für den AB-620-Kontext bedeutet dies, dass RFI-Prozesse von Anfang an mit klaren, eindeutigen Zuständigkeiten (ein verantwortlicher Prüfer statt mehrerer) und innerhalb des eigenen Tenants geplant werden sollten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information",
      "sourceTitle": "Request information from human review in agent flows"
    },
    {
      "id": "d1-036",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Multistage- und KI-Genehmigungen",
      "content": "Multistage-Genehmigungen (Preview) sind eine erweiterte Freigabefunktion in Agent Flows für komplexere Genehmigungsprozesse, die über einfache Standardfreigaben aus Cloud-Flows hinausgehen. Sie kombinieren menschliche und KI-basierte Überprüfungsstufen: Manuelle Stufen fragen Entscheidungen bei menschlichen Stakeholdern ab (z. B. 'erste Person genehmigt' oder 'alle müssen genehmigen'), während KI-Stufen anhand vorgegebener Anweisungen, Dokumente, Bilder und Texte automatisiert eine Genehmigen/Ablehnen-Entscheidung mit Begründung treffen. Zusätzlich lassen sich zwischen den Stufen Bedingungen platzieren, die den Workflow je nach erfüllten Kriterien dynamisch steuern – etwa automatisch genehmigen, ablehnen, an eine andere Stufe weiterleiten oder Stufen überspringen. Der Sinn dieser Kombination ist es, Routineentscheidungen zu beschleunigen, während komplexe Fälle weiterhin menschlicher Kontrolle unterliegen und Compliance-Anforderungen eingehalten werden. Für AB-620 zeigt dies, wie Copilot Studio menschliche und KI-gestützte Governance in einem einzigen Freigabeprozess verbindet, statt beides getrennt zu betrachten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-advanced-approvals",
      "sourceTitle": "Multistage and AI approvals in agent flows (preview)"
    },
    {
      "id": "d1-037",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Fehlerbehandlung – Recognition Errors",
      "content": "Recognition Errors treten auf, wenn ein Agent die Absicht des Nutzers nicht versteht, etwa weil dessen Eingabe mehrdeutig oder unklar formuliert ist. In solchen Fällen soll der Agent aktiv um Klarstellung bitten, statt die Anfrage einfach zu ignorieren oder falsch zu interpretieren – denn der Nutzer selbst merkt oft gar nicht, dass seine Eingabe unklar war. Wichtig ist dabei die Eskalationsstrategie: Der Nutzer sollte nicht mehr als zweimal aufgefordert werden, seine Anfrage zu wiederholen oder umzuformulieren. Bleibt die Absicht auch nach zwei Versuchen unklar, sollte der Agent an einen Menschen übergeben oder eine andere Eskalationsmaßnahme wie E-Mail nutzen, statt den Nutzer in einer Wiederholungsschleife festzuhalten. Beim zweiten Versuch empfiehlt es sich zudem, statt einer erneuten offenen Frage konkrete Auswahlmöglichkeiten anzubieten. Diese Regel ist Teil der konversationellen Fehlerbehandlung in Copilot Studio und dient dazu, Frustration bei Nutzern zu vermeiden und einen klaren Ausweg aus Missverständnissen zu gewährleisten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-handle-errors",
      "sourceTitle": "Handle errors effectively - Microsoft Copilot Studio"
    },
    {
      "id": "d1-038",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Fehlerbehandlung – Execution und Input Errors",
      "content": "Execution Errors entstehen als Folge von Recognition Errors: Der Agent hat die Nutzereingabe missverstanden oder falsch zugeordnet und führt dadurch die falsche Aktion aus, etwa indem er zwei Artikel statt eines zur Liste hinzufügt oder einen Eintrag in die falsche Liste einträgt. Um solche Fehler zu vermeiden bzw. korrigierbar zu machen, empfiehlt Microsoft, vor der Ausführung einer Aktion eine Bestätigung einzuholen, zum Beispiel: 'OK, ich füge X hinzu. Ist das korrekt?' – das gibt dem Nutzer die Möglichkeit, den Fehler zu korrigieren, bevor er passiert. Gleichzeitig sollte diese Bestätigungsfrage nicht bei jeder einzelnen Aktion eingesetzt werden, da zu viele Rückfragen den Nutzer stören können. Input Errors sind demgegenüber Fälle, in denen die Nutzereingabe schlicht nicht zur gestellten Frage passt oder unverständlich ist (z. B. zufällige Zeichenfolgen); hier reicht in der Regel eine einfache, höfliche Bitte um Wiederholung wie 'Entschuldigung, das habe ich nicht verstanden. Kannst du das nochmal sagen?'. Beide Fehlertypen zeigen, dass die richtige Reaktion vom Ursprung des Fehlers abhängt – Bestätigung vor Ausführung versus einfache Wiederholungsbitte.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-handle-errors",
      "sourceTitle": "Handle errors effectively - Microsoft Copilot Studio"
    },
    {
      "id": "d1-039",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Technische Fehler – Kommunikationsstrategie",
      "content": "Neben Verständnisproblemen kann es auch zu technischen Fehlern kommen, bei denen der Agent nicht wie vorgesehen funktioniert. Microsoft unterscheidet hier drei Kategorien: 'Fehler mit Lösung', bei denen ein Workaround oder eine Behebung bekannt und verfügbar ist oder aktiv daran gearbeitet wird; 'Fehler ohne Lösung', bei denen das Problem zwar bekannt ist, aber (noch) kein Workaround existiert; und 'unbekannte Fehler', bei denen unklar ist, warum der Agent nicht funktioniert. In allen Fällen soll der Nutzer transparent darüber informiert werden, dass ein Problem vorliegt, statt es zu verschweigen. Ist absehbar, dass ein erneuter Versuch später erfolgreich sein könnte, kann der Agent dies mitteilen (z. B. 'Bitte versuche es in ein paar Minuten erneut'); wiederholt sich derselbe Fehler jedoch, sollte davon abgesehen werden, da dies Misstrauen und Frustration erzeugt. Bei unbekannten oder ungelösten Fehlern sollte der Nutzer stattdessen konsequent an eine andere Ressource verwiesen werden, etwa an den Support, eine FAQ-Seite oder den E-Mail-/Chat-Support – damit er trotz des technischen Problems eine Möglichkeit hat, weiterzukommen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-handle-errors",
      "sourceTitle": "Handle errors effectively - Microsoft Copilot Studio"
    },
    {
      "id": "d1-040",
      "domainId": "d1",
      "subDomainId": "d1-sub-topics-variablen",
      "topic": "System-Topic 'On Error'",
      "content": "System-Topics sind vordefinierte Topics, die automatisch bei der Erstellung eines Agenten in Copilot Studio angelegt werden und typische, wiederkehrende Ereignisse einer Konversation abdecken; sie können nicht gelöscht, aber bei Bedarf deaktiviert werden. Das System-Topic 'On Error' ist eines davon und wird ausgelöst, wenn während einer Konversation ein Nutzerfehler auftritt – es informiert den Kunden darüber, dass etwas schiefgelaufen ist, behandelt aber ausdrücklich keine Systemfehler, sondern nutzerbezogene Fehler. Die dabei angezeigte Nachricht enthält einen Fehlercode, die Conversation-ID und einen Zeitstempel des Fehlers; diese Angaben dienen später der gezielten Fehlersuche und -diagnose, etwa im Test-Panel, wo zusätzlich eine detailliertere Fehlermeldung angezeigt wird. Für Copilot-Studio-Maker ist 'On Error' damit ein eingebautes Sicherheitsnetz: Es sorgt dafür, dass Nutzer bei einem Fehler nicht ins Leere laufen, sondern eine nachvollziehbare Information mit Diagnosedaten erhalten, die im Support- oder Debugging-Prozess weiterverwendet werden können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-system-topics",
      "sourceTitle": "Use system topics - Microsoft Copilot Studio"
    },
    {
      "id": "d1-041",
      "domainId": "d1",
      "subDomainId": "d1-sub-topics-variablen",
      "topic": "System-Topics und Konversationsende",
      "content": "System-Topics sind vorgefertigte Topics, die Copilot Studio jedem neuen Agenten automatisch hinzufügt, damit dieser auf wiederkehrende Ereignisse wie Begrüßung, Eskalation oder Konversationsende reagieren kann, ohne dass die Autorin oder der Autor diese Logik selbst bauen muss. Sie existieren, weil bestimmte Konversationsmuster in praktisch jedem Bot vorkommen und so nicht jedes Mal neu entwickelt werden müssen. Löst der Agent eines der System-Topics 'End of Conversation', 'Confirmed Success', 'Confirmed Failure', 'Goodbye', 'Escalate' oder 'Start over' aus, wird die Konversation beendet, da diese Topics als klare Abschlusspunkte definiert sind. Im Gegensatz zu selbst erstellten Topics können System-Topics nicht gelöscht werden, sie lassen sich aber deaktivieren, wenn ihr Verhalten nicht benötigt wird. Für AB-620 ist wichtig zu wissen, wann und warum eine Konversation automatisch endet, um das Verhalten des Agenten korrekt vorhersagen und testen zu können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-system-topics",
      "sourceTitle": "Use system topics - Microsoft Copilot Studio"
    },
    {
      "id": "d1-042",
      "domainId": "d1",
      "subDomainId": "d1-sub-topics-variablen",
      "topic": "Trigger Phrases – Best Practices",
      "content": "Trigger Phrases sind Beispieläußerungen, mit denen das Natural-Language-Understanding-Modell (NLU) eines Agenten trainiert wird, damit dieser erkennt, wann eine Nutzerin oder ein Nutzer ein bestimmtes Anliegen anspricht und das passende Topic ausgelöst werden soll. Sie sind wichtig, weil die Qualität der Trigger Phrases direkt bestimmt, wie zuverlässig der Agent Anfragen dem richtigen Topic zuordnet, statt in den Fallback zu geraten. Beim Erstellen eines neuen Topics sollten idealerweise 5 bis 10 Beispielphrasen angegeben werden, die typische, möglichst aus echten Nutzerdaten stammende Formulierungen abbilden, mit denen Menschen ihr Problem beschreiben. Zur Laufzeit vergleicht die KI die tatsächliche Nutzeräußerung mit allen hinterlegten Trigger Phrases und löst das inhaltlich am nächsten liegende Topic aus. Für den AB-620-Kontext ist relevant, dass gut formulierte, abwechslungsreiche und nicht zu kurze Trigger Phrases die Trefferquote der Topic-Erkennung deutlich verbessern und Verwechslungen zwischen ähnlichen Topics reduzieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/trigger-phrases-best-practices",
      "sourceTitle": "Design effective trigger phrases - Microsoft Copilot Studio"
    },
    {
      "id": "d1-043",
      "domainId": "d1",
      "subDomainId": "d1-sub-topics-variablen",
      "topic": "Variablen-Scopes",
      "content": "Variablen in Copilot Studio existieren auf vier verschiedenen Ebenen, den sogenannten Scopes, die festlegen, wo eine Variable gelesen und geschrieben werden kann. Topic-Variablen sind der Standardscope und nur innerhalb des Topics nutzbar, in dem sie erstellt wurden; globale Variablen dagegen stehen in allen Topics eines Agenten zur Verfügung und eignen sich für Informationen, die über mehrere Konversationsabschnitte hinweg gebraucht werden. System-Variablen werden automatisch von Copilot Studio erzeugt und liefern Kontextinformationen zur Konversation oder zur Nutzerin bzw. zum Nutzer, etwa den Namen oder den Anmeldestatus. Environment-Variablen schließlich werden in der Power Platform angelegt und sind in Copilot Studio nur lesbar; sie dienen dazu, Parameter wie externe Referenzen von der eigentlichen Anwendungslogik zu trennen. Dieses Scope-Konzept ist zentral für AB-620, weil es bestimmt, welche Daten wo im Agenten sichtbar sind und wie Informationen sauber zwischen Topics weitergegeben werden können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about",
      "sourceTitle": "Variables overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-044",
      "domainId": "d1",
      "subDomainId": "d1-sub-topics-variablen",
      "topic": "Variablentypen und Typbindung",
      "content": "Jede Variable in Copilot Studio besitzt einen Basistyp, zum Beispiel String, Boolean, Number, Table, Record, DateTime, Choice oder Blank, der bestimmt, welche Werte die Variable annehmen kann und welche logischen Operatoren mit ihr verwendbar sind. Dieser Typ wird nicht im Voraus deklariert, sondern automatisch beim ersten Zuweisen eines Werts festgelegt – weist man einer Variable etwa zuerst die Zahl 1 zu, wird ihr Typ 'Number'. Danach bleibt der Typ fixiert: Eine spätere Zuweisung eines Werts eines anderen Typs, etwa eines Textes zu einer Number-Variable, führt zu einem Fehler. Diese Typbindung existiert, um konsistente und vorhersehbare Logik in Bedingungen und Ausdrücken sicherzustellen. Für AB-620-Autorinnen und -Autoren bedeutet das, beim Design von Topics von Anfang an zu überlegen, welchen Datentyp eine Variable tragen soll, um spätere Laufzeitfehler zu vermeiden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about",
      "sourceTitle": "Variables overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-045",
      "domainId": "d1",
      "subDomainId": "d1-sub-topics-variablen",
      "topic": "Environment-Variablen für ALM",
      "content": "Environment-Variablen sind ein Konzept der Power Platform und ermöglichen das grundlegende Application-Lifecycle-Management-Szenario (ALM), bei dem eine Anwendung zwischen verschiedenen Power-Platform-Umgebungen verschoben wird, ohne den Anwendungscode selbst anpassen zu müssen. Sie existieren, weil sich bestimmte externe Referenzen wie Verbindungs- oder Konfigurationswerte zwischen einer Entwicklungs-, Test- und Produktionsumgebung unterscheiden, die restliche Anwendungslogik aber identisch bleiben soll. In Copilot Studio werden Environment-Variablen wie Topic-, globale und System-Variablen genutzt, sind dort jedoch schreibgeschützt: Änderungen können nur Administratorinnen und Administratoren in Power Apps vornehmen. Wird der Wert einer Environment-Variable geändert, muss der Agent in der Regel neu veröffentlicht werden, damit die Änderung zur Laufzeit wirksam wird – eine Ausnahme bilden Variablen vom Typ 'Secret', die zur Laufzeit direkt abgerufen werden. Für AB-620 ist das Konzept zentral, um Umgebungswechsel und Deployments von Copilot-Studio-Lösungen sauber zu planen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about",
      "sourceTitle": "Variables overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-046",
      "domainId": "d1",
      "subDomainId": "d1-sub-adaptive-cards-generative-antworten",
      "topic": "Adaptive Cards – Grundkonzept",
      "content": "Adaptive Cards sind plattformunabhängige, in JSON geschriebene UI-Bausteine, die zwischen Apps und Diensten offen ausgetauscht werden können und sich beim Empfänger automatisch an dessen Darstellungskontext anpassen, etwa an helles oder dunkles Design. Sie existieren, weil Entwicklerinnen und Entwickler nicht für jede Zielplattform (Teams, Outlook, Webchat) eine eigene Benutzeroberfläche bauen möchten, sondern eine einzige Kartenbeschreibung wiederverwenden wollen. In Copilot Studio werden Adaptive Cards genutzt, um Informationen von Kundinnen und Kunden abzufragen oder um Inhalte anschaulich darzustellen. Copilot Studio unterstützt die Adaptive-Cards-Schemaversionen bis einschließlich 1.6, wobei die tatsächlich nutzbare Version vom Zielkanal abhängt: Der Webchat unterstützt Version 1.6 (ohne Action.Execute), während Teams und der Omnichannel-Livechat auf Version 1.5 begrenzt sind; zudem rendert Copilot Studio Version-1.6-Karten nur im Testchat, nicht auf dem Autoring-Canvas. Für AB-620 ist relevant, welche Kartenversion für den jeweiligen Veröffentlichungskanal zulässig ist, um Darstellungsfehler zu vermeiden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-cards-overview",
      "sourceTitle": "Using Adaptive Cards in Copilot Studio"
    },
    {
      "id": "d1-047",
      "domainId": "d1",
      "subDomainId": "d1-sub-adaptive-cards-generative-antworten",
      "topic": "Adaptive Card Node vs. Message Node",
      "content": "Copilot Studio bietet zwei unterschiedliche Wege, Adaptive Cards in einer Konversation einzusetzen, je nachdem ob eine Interaktion der Nutzerin bzw. des Nutzers erforderlich ist oder nicht. Der 'Ask with Adaptive Card'-Knoten ist für interaktive Karten gedacht, bei denen erwartet wird, dass die Person eine Antwort über mindestens einen Submit-Button zurücksendet, etwa um Formularfelder auszufüllen; die eingegebenen Werte werden dabei automatisch in Variablen gespeichert. Soll die Karte hingegen nur Informationen anzeigen, ohne dass eine Rückmeldung erwartet wird, fügt man sie stattdessen einem Message- oder Question-Knoten hinzu. Diese Unterscheidung existiert, weil interaktive und rein informative Karten unterschiedliche Anforderungen an Struktur und Verhalten des Bots stellen. Für AB-620 ist es wichtig, den richtigen Knotentyp je nach Anwendungsfall zu wählen, damit die Konversation weder unnötig auf eine Nutzereingabe wartet noch Eingabemöglichkeiten fehlen, wo sie gebraucht werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-ask-with-adaptive-card",
      "sourceTitle": "Ask with Adaptive Cards - Microsoft Copilot Studio"
    },
    {
      "id": "d1-048",
      "domainId": "d1",
      "subDomainId": "d1-sub-adaptive-cards-generative-antworten",
      "topic": "Generative Answers – Conversational Boosting",
      "content": "Generative Answers ermöglichen es einem Agenten, Antworten direkt aus verbundenen Wissensquellen zu generieren, ohne dass dafür eigene Topics angelegt werden müssen, was die Erstellung funktionsfähiger Agenten erheblich beschleunigt. Beim Erstellen eines Agenten legt Copilot Studio dafür automatisch das System-Topic 'Conversational boosting' mit einem darin enthaltenen Generative-Answers-Knoten an. Alle Wissensquellen, die auf Agentenebene über die Knowledge-Seite hinzugefügt werden, werden automatisch diesem Knoten zugeordnet. Dieses System-Topic wird ausgelöst, wenn die Nutzeranfrage keinem der von der Autorin oder dem Autor erstellten Topics zugeordnet werden kann, und liefert dann eine aus den Wissensquellen generierte Antwort als Fallback. Für AB-620 ist wichtig zu verstehen, dass so auch unvorhergesehene Fragen abgedeckt werden können, ohne dass für jede denkbare Anfrage ein eigenes Topic gebaut werden muss.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d1-049",
      "domainId": "d1",
      "subDomainId": "d1-sub-adaptive-cards-generative-antworten",
      "topic": "Nicht unterstützte Wissensquellen im Generative-Answers-Node",
      "content": "Nicht jede Art von Wissensquelle lässt sich direkt in einem Generative-Answers-Knoten verwenden: Bing-Custom-Search-, Azure-OpenAI- und Custom-Data-Quellen werden dort aktuell nicht nativ unterstützt. Das liegt daran, dass diese Quellentypen ursprünglich für den klassischen Suchmechanismus (Classic-Modus) konzipiert wurden und technisch anders angebunden werden als die generativen Standardquellen wie SharePoint oder Dataverse. Um diese Quellentypen trotzdem nutzen zu können, muss in den Knoteneigenschaften des Generative-Answers-Knotens die Option 'Classic data' aktiviert werden, wodurch die Suche über den klassischen Mechanismus erfolgt. Für AB-620-Autorinnen und -Autoren ist das relevant, weil sonst beim Versuch, etwa eine Azure-OpenAI-Quelle direkt einzubinden, unerwartetes Verhalten oder fehlende Ergebnisse auftreten können, wenn die Classic-Data-Option übersehen wird.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d1-050",
      "domainId": "d1",
      "subDomainId": "d1-sub-wiederverwendbare-komponenten",
      "topic": "Wiederverwendbare Komponenten – Child Agents vs. Connected Agents",
      "content": "Copilot Studio erlaubt es, Lösungen modular aus mehreren zusammenarbeitenden Agenten aufzubauen, wofür es zwei grundsätzliche Ansätze gibt: Child Agents und verbundene (Connected) Agents. Child Agents sind leichtgewichtige Unteragenten innerhalb eines bestehenden Agenten und eignen sich, wenn ein einzelner Anwendungsfall oder eine einzelne Aufgabe abgebildet werden soll, ein kleines, zusammenhängendes Team die gesamte Lösung verwaltet und keine separate Konfiguration, Authentifizierung oder eigenständige Veröffentlichung benötigt wird. Verbundene Agents dagegen sind eigenständige, separat existierende Agenten und eignen sich, wenn mehrere Teams unabhängig voneinander verwalten, eigene ALM-Prozesse (Application Lifecycle Management) benötigen, eigene Kanäle oder Einstellungen pro Agent erforderlich sind, oder der Agent von mehreren Hauptagenten wiederverwendet werden soll. Diese Unterscheidung existiert, weil sie unterschiedliche Anforderungen an Governance, Wiederverwendbarkeit und Verwaltungsaufwand erfüllt. Für AB-620 ist die Wahl zwischen beiden Ansätzen eine zentrale Architekturentscheidung beim Aufbau mehrteiliger Agentenlösungen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
      "sourceTitle": "Add other agents overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-051",
      "domainId": "d1",
      "subDomainId": "d1-sub-wiederverwendbare-komponenten",
      "topic": "Schwellenwert für Multi-Agent-Aufteilung",
      "content": "Wenn ein Agent zu viele Wahlmöglichkeiten hat, zwischen denen er unterscheiden muss, kann seine Fähigkeit, Anfragen korrekt zuzuordnen, spürbar nachlassen. Als Faustregel gilt laut Microsoft, dass diese Leistungsminderung eintreten kann, sobald ein Hauptagent mehr als 30 bis 40 Auswahlmöglichkeiten – also Tools, Topics und andere Agenten zusammen – zur Verfügung hat, wobei eine Verschlechterung auch schon bei weniger, aber sehr ähnlich beschriebenen Optionen auftreten kann. In solchen Fällen sollte zunächst geprüft werden, ob eine bessere Differenzierung der Beschreibungen möglich ist; reicht das nicht aus, kann die Aufteilung der Lösung auf mehrere verbundene Agenten helfen, die Präzision der Anfragenerkennung wiederherzustellen. Dieser Schwellenwert ist ein praktischer Richtwert und kein starres technisches Limit, weshalb die tatsächliche Leistung stets anhand eigener Auswertungen des Agentenverhaltens überprüft werden sollte. Für AB-620 ist dieser Wert eine wichtige Orientierungsgröße bei der Entscheidung, wann eine Lösung architektonisch aufgeteilt werden sollte.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
      "sourceTitle": "Add other agents overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-052",
      "domainId": "d1",
      "subDomainId": "d1-sub-wiederverwendbare-komponenten",
      "topic": "Auswirkungen von Multi-Agent-Lösungen",
      "content": "Die Aufteilung einer Lösung auf mehrere miteinander verbundene Agenten bringt neben Vorteilen bei Modularität und Wiederverwendbarkeit auch konkrete Nachteile mit sich, die beim Design berücksichtigt werden sollten. Da jeder verbundene Agent seine eigene Orchestrierungsebene besitzt, entsteht bei der Weiterleitung einer Anfrage vom Hauptagenten an einen verbundenen Agenten ein zusätzlicher Orchestrierungs-Hop, der die Antwortzeit (Latenz) der Konversation erhöht: Der Hauptagent muss zunächst erkennen, welcher verbundene Agent zuständig ist, bevor dieser die Anfrage mit seinen eigenen verfügbaren Tools verarbeitet. Zusätzlich vergrößert eine Aufteilung auf mehrere Agenten die insgesamt zu testende, zu verwaltende und zu überwachende (governance-relevante) Fläche der Gesamtlösung, weil nun mehrere eigenständige Komponenten koordiniert werden müssen. Dieses Abwägen zwischen Modularität einerseits und Latenz sowie Verwaltungsaufwand andererseits ist für AB-620 zentral, um fundierte Architekturentscheidungen für Multi-Agent-Lösungen zu treffen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
      "sourceTitle": "Add other agents overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-053",
      "domainId": "d1",
      "subDomainId": "d1-sub-wiederverwendbare-komponenten",
      "topic": "Externe Agentenverbindungen",
      "content": "Neben eigenen Child Agents und verbundenen Copilot-Studio-Agenten innerhalb derselben Umgebung erlaubt Copilot Studio auch die Anbindung an Agenten außerhalb der eigenen Plattform, um Lösungen mit externen Systemen und Diensten zu erweitern. Dazu zählen Agenten, die über das offene A2A-Protokoll (Agent-to-Agent) erreichbar sind, Microsoft-Foundry-Agents, Fabric-Data-Agents sowie Agenten, die mit dem Microsoft 365 Agents SDK gebaut wurden. Diese Möglichkeit existiert, damit Organisationen bereits bestehende oder auf anderen Plattformen entwickelte Agenten in ihre Copilot-Studio-Lösung integrieren können, statt alles neu bauen zu müssen. Die Anbindung an Foundry-, Fabric- und Microsoft-365-Agents-SDK-Agenten befindet sich aktuell im Public-Preview-Status und ist damit noch nicht für den produktiven Einsatz vorgesehen; zudem gelten bestimmte Einschränkungen, etwa dass Fabric-Data-Agents derzeit nicht per Redirect-Knoten angesprochen werden können. Für AB-620 ist relevant, dass Copilot Studio damit über die eigene Plattform hinaus in ein größeres Ökosystem von KI-Agenten eingebettet werden kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
      "sourceTitle": "Add other agents overview - Microsoft Copilot Studio"
    },
    {
      "id": "d1-054",
      "domainId": "d1",
      "subDomainId": "d1-sub-agent-flows",
      "topic": "Copilot Studio Architektur – Agents vs. Workflows",
      "content": "Microsoft Copilot Studio ist ein grafisches Low-Code-Studio, in dem sich zwei grundlegende Bausteine unterscheiden lassen, die auch gemeinsam eingesetzt werden können: Agents und Workflows. Ein Agent ist ein KI-Assistent, der Konversationen führt, den Anweisungen der Autorin oder des Autors folgt, verbundene Wissensquellen nutzt und Tools einsetzt, um eine Anfrage zu verarbeiten und die jeweils passende nächste Aktion selbst zu bestimmen. Ein Workflow dagegen ist eine per Drag-and-Drop erstellte Automatisierung, bei der jeder Schritt selbst denken und handeln kann, sodass Agenten, Tools und Logik in einem einzigen Ablauf kombiniert werden; Workflows enthalten zudem eingebaute Test- und Human-in-the-Loop-Kontrollen für den unternehmenstauglichen Einsatz. Diese Trennung existiert, weil manche Aufgaben eine flexible, gesprächsbasierte Reaktion erfordern (Agent), während andere eine vorhersehbare, schrittweise Automatisierung benötigen (Workflow) – beide Bausteine können jedoch zusammenarbeiten, etwa wenn ein Workflow einen Agenten als einzelnen Schritt aufruft. Für AB-620 ist dieses Grundverständnis wichtig, um zu erkennen, wann ein Anwendungsfall eher als Agent, als Workflow oder als Kombination aus beidem umgesetzt werden sollte.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio",
      "sourceTitle": "Copilot Studio overview"
    },
    {
      "id": "d2-001",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Knowledge Sources Übersicht",
      "content": "Wissensquellen (Knowledge Sources) sind die Grundlage dafür, dass ein Copilot-Studio-Agent Antworten nicht nur aus dem allgemeinen Sprachmodellwissen, sondern aus konkreten Unternehmensdaten generiert – man spricht hier von 'Grounding'. Sie existieren, weil ein Agent ohne angebundene Daten nur generisches Wissen hätte und keine firmenspezifischen oder aktuellen Informationen liefern könnte. In Copilot Studio können Wissensquellen auf zwei Ebenen eingebunden werden: agentweit auf der Seite 'Knowledge', sodass sie im gesamten Agenten verfügbar sind, oder gezielt auf Themen-Ebene über einen 'Generative Answers'-Knoten für bestimmte Absichten. Sobald ein Agent veröffentlicht wird, greift er automatisch auf die konfigurierten Wissensquellen zurück, um seine Antworten zu fundieren (zu grounden) statt frei zu erfinden. Für die AB-620-Prüfung ist wichtig zu verstehen, dass diese Konfiguration sowohl beim Erstellen des Agenten als auch nachträglich oder direkt im Themen-Editor erfolgen kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d2-002",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Unterstützte Wissensquellentypen",
      "content": "Copilot Studio bietet mehrere Typen von Wissensquellen an, die je nach Datenlage und Anwendungsfall gewählt werden. 'Public Website' durchsucht per Bing-Suche ausschließlich vorgegebene, vom Unternehmen freigegebene Webseiten. 'Documents' greift auf Dateien zurück, die direkt in Dataverse hochgeladen wurden. 'SharePoint' verbindet sich über GraphSearch mit SharePoint-Seiten oder -Listen, während 'Dataverse' eine Retrieval-Augmented-Generation-Technik nutzt, um Daten aus der konfigurierten Dataverse-Umgebung einzubeziehen. Zusätzlich existiert 'Enterprise data using connectors', worüber Organisationsdaten genutzt werden, die von Microsoft Search indiziert wurden. Diese Vielfalt existiert, damit Unternehmen je nach vorhandener Infrastruktur (Webseite, Dateien, SharePoint, Dataverse oder andere Systeme) die passende Datenquelle anbinden können, ohne Daten migrieren zu müssen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d2-003",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Agentenbenutzer-Authentifizierung bei Wissensquellen",
      "content": "Bei den internen Wissensquellentypen SharePoint, Dataverse und Enterprise-Daten via Konnektoren greift die Microsoft-Entra-ID-Authentifizierung des jeweiligen Agentenbenutzers. Das bedeutet konkret: Wenn eine bestimmte Person den Agenten befragt, zeigt dieser ihr ausschließlich Inhalte an, auf die sie auch mit ihrem eigenen Konto tatsächlich Zugriffsrechte hat – der Agent umgeht keine bestehenden Berechtigungsstrukturen. Dieser Mechanismus ist essenziell für die Sicherheit in Unternehmensumgebungen, da er verhindert, dass ein KI-Agent versehentlich vertrauliche oder für den jeweiligen Nutzer gesperrte Informationen preisgibt. Für SharePoint bedeutet dies zum Beispiel konkret, dass mindestens Lese-Berechtigung auf der jeweiligen Site erforderlich ist, sonst antwortet der Agent mit 'keine Antwort'. Im AB-620-Kontext ist dies ein zentrales Konzept, da es Datenschutz und rollenbasierten Zugriff direkt mit der Agentenarchitektur verknüpft.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d2-004",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Klassische vs. generative Orchestrierung bei Wissensquellen",
      "content": "Copilot Studio unterscheidet zwei Orchestrierungsmodi, die bestimmen, wie ein Agent Wissensquellen durchsucht: die klassische und die generative Orchestrierung. In der klassischen Orchestrierung gelten feste, harte Limits je Quellentyp, etwa maximal vier SharePoint-URLs oder zwei Dataverse-Wissensquellen mit jeweils bis zu 15 Tabellen – dies sorgt für Vorhersehbarkeit und Performance-Kontrolle. Bei der generativen Orchestrierung ist das Limit deutlich höher (z. B. 25 SharePoint-URLs), und wenn insgesamt mehr als 25 unterschiedliche Wissensquellen konfiguriert sind, filtert ein internes GPT-Modell automatisch die relevantesten Quellen für die jeweilige Anfrage. Hochgeladene Dateien zählen dabei nicht zu diesem 25er-Limit, da sie separat behandelt werden. Dieser Unterschied ist wichtig, weil er zeigt, dass mit zunehmender KI-gestützter Orchestrierung starre Obergrenzen durch intelligente, kontextabhängige Auswahlprozesse ersetzt werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d2-005",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Allow ungrounded responses",
      "content": "Die Einstellung 'Allow ungrounded responses' befindet sich im Bereich 'Knowledge' der 'Generative AI'-Einstellungen eines Agenten und ist nur verfügbar, wenn generative Orchestrierung aktiv ist. Sie regelt, ob der Agent Antworten allein aus dem allgemeinen Modellwissen geben darf, auch wenn dabei keine Wissensquelle oder kein Tool herangezogen wird. Ist die Option aktiviert, kann der Agent frei antworten, selbst ohne Datenabruf; ist sie deaktiviert, wird jede Antwort blockiert, die in einem Gesprächsschritt ohne Nutzung einer Wissensquelle oder eines Tools entstünde, und stattdessen das Fallback-Thema ausgelöst. Diese Regel existiert, um zu verhindern, dass ein Unternehmens-Agent unkontrolliert 'halluzinierte' oder nicht belegbare Aussagen trifft, was gerade in professionellen Kontexten riskant wäre. Praktisch bedeutet dies zum Beispiel, dass eine Folgefrage, die der Agent allein aus dem bisherigen Gesprächsverlauf beantworten könnte, ebenfalls blockiert wird, wenn dabei keine erneute Quelle konsultiert wurde.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d2-006",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Offizielle Quellen (Official Source)",
      "content": "Eine Wissensquelle kann in Copilot Studio als 'Official Source' markiert werden, wenn sie nachweislich einem strengen Verifizierungsprozess unterliegt und deshalb als besonders vertrauenswürdig gilt. Der Agent nutzt eine so gekennzeichnete Quelle dann direkt, ohne zusätzliche interne Verifikationsschritte durchzuführen, was Antwortzeit und Konsistenz verbessert. Markiert wird eine Quelle über die drei Punkte (⋮) neben der jeweiligen Wissensquelle auf der 'Knowledge'-Seite, gefolgt von der Auswahl 'Official source' und Bestätigung. Wichtig ist dabei die Einschränkung: Diese Funktion ist mit aktivierter generativer Orchestrierung nicht kompatibel – wer offizielle Quellen nutzen möchte, muss generative Orchestrierung deaktivieren. Antworten, die auf einer offiziellen Quelle basieren, werden zudem im Chat mit einer besonderen Kennzeichnung eingeleitet, damit Nutzer erkennen, dass diese Antwort besonders vertrauenswürdig eingestuft wurde.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio",
      "sourceTitle": "Knowledge sources summary - Microsoft Copilot Studio"
    },
    {
      "id": "d2-007",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "SharePoint als Wissensquelle",
      "content": "Beim Einrichten von SharePoint als Wissensquelle gibt man eine oder mehrere SharePoint-URLs ein; mehrere URLs werden dabei durch einen manuellen Zeilenumbruch (Umschalt+Enter) voneinander getrennt. Der Agent durchsucht dann die angegebene URL sowie alle ihre Unterpfade, greift aber nie auf übergeordnete Ordner, Geschwisterordner oder andere, nicht registrierte Sites zu – dies begrenzt den Suchradius kontrolliert und verhindert versehentlichen Zugriff auf falsche Bereiche. Für SharePoint-basierte Wissensquellen kann zusätzlich 'Tenant graph grounding with semantic search' aktiviert werden, was durch fortschrittlichere interne Retrieval-Technologie präzisere und kontextreichere Ergebnisse liefert. Dieser Vorteil hat jedoch einen Kompromiss: Durch die höhere Systemkomplexität kann sich bei manchen Nutzern oder Anfragen die Antwortzeit leicht erhöhen. Zudem respektiert diese Quelle Sensitivity Labels und Berechtigungen, sodass verschlüsselte oder gesperrte Dokumente selbst bei Status 'Ready' keine Antwort liefern.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint",
      "sourceTitle": "Add SharePoint as a knowledge source"
    },
    {
      "id": "d2-008",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Azure AI Search als Wissensquelle – Konfiguration",
      "content": "Azure AI Search ist eine leistungsstarke Suchmaschine, die große Dokumentensammlungen durchsuchbar macht, und kann in Copilot Studio als Wissensquelle eingebunden werden. Wichtig ist, dass die eigentliche Konfiguration – etwa das Anlegen des Suchdienstes, das Erstellen eines Vektorindex und die Aktivierung von Funktionen – vollständig in Azure erfolgen muss, bevor die Verbindung in Copilot Studio hergestellt wird. Copilot Studio unterstützt dabei vektorisierte Indizes, die über 'Integrated Vectorization' erstellt wurden: Hierbei wird beim Import der Daten automatisch dasselbe Einbettungsmodell verwendet, das später auch die eingehende Nutzeranfrage zur Laufzeit vektorisiert, wodurch keine zusätzliche Programmierung nötig ist. Zusätzlich wird das 'Semantic Ranker'-Feature unterstützt, das die Relevanz der Suchergebnisse durch semantisches Ranking verbessert und ebenfalls vorab in Azure AI Search eingerichtet werden muss. Dieser Aufbau zeigt, dass Copilot Studio bewusst auf bestehende, spezialisierte Azure-Infrastruktur aufsetzt statt eigene Suchlogik neu zu erfinden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
      "sourceTitle": "Add Azure AI Search as a knowledge source"
    },
    {
      "id": "d2-009",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Azure AI Search Verbindung – Authentifizierungsoptionen",
      "content": "Beim Anlegen einer neuen Verbindung zu Azure AI Search in Copilot Studio muss zunächst ein Authentifizierungstyp gewählt werden: Access Key (schlüsselbasiert), Client Certificate Auth, Service Principal (eine Microsoft-Entra-ID-Anwendung) oder Microsoft Entra ID Integrated. Diese Auswahlmöglichkeit existiert, weil Unternehmen unterschiedliche Sicherheitsanforderungen und bestehende Identitätsinfrastrukturen haben – von einfachen API-Schlüsseln bis zu vollständig in Entra ID integrierten Diensten. Wichtig zu wissen ist außerdem, dass eine solche Verbindung immer als formale Datenverbindung angelegt werden muss und nicht manuell über Endpunkt und Schlüssel konfiguriert werden darf, da fehlerhafte manuelle Verbindungen zu nicht löschbaren, defekten Datenverbindungen auf Umgebungsebene führen können. Pro Verbindung kann zudem nur genau ein Vektorindex hinzugefügt werden, was die Struktur überschaubar hält. Nach erfolgreicher Erstellung indiziert Copilot Studio die Metadaten und der Status wechselt von 'In progress' zu 'Ready', bevor die Quelle getestet werden kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
      "sourceTitle": "Add Azure AI Search as a knowledge source"
    },
    {
      "id": "d2-010",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Azure AI Search – Zitate (Citations)",
      "content": "Damit ein Copilot-Studio-Agent bei Antworten aus einer Azure-AI-Search-Wissensquelle konkrete Zitate (Quellenangaben mit Link zum Originaldokument) liefern kann, muss der zugrunde liegende Suchindex ein Feld mit einer echten URL zum jeweiligen Dokument enthalten. Existiert im Index das Feld 'metadata_storage_path', interpretiert Copilot Studio dieses automatisch als Zitatquelle. Fehlt dieses Feld, verwendet das System stattdessen jedes andere Feld, das eine vollständige URL enthält, als Zitat. Diese Funktion ist wichtig, damit Nutzer die Antwort eines Agenten nachvollziehen und die Originalquelle prüfen können, was Vertrauen und Transparenz schafft. Allerdings muss dabei sichergestellt sein, dass Nutzer auch tatsächlich Zugriff auf die verlinkte Quelle haben – zeigt ein Zitat auf eine geschützte Ressource, für die der Nutzer keine Berechtigung besitzt, kann er das Zitat nicht öffnen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
      "sourceTitle": "Add Azure AI Search as a knowledge source"
    },
    {
      "id": "d2-011",
      "domainId": "d2",
      "subDomainId": "d2-sub-wissensquellen",
      "topic": "Azure AI Search und Virtual Network Support",
      "content": "Copilot Studio unterstützt auch Azure-AI-Search-Indizes, die innerhalb eines Virtual Networks (VNet) betrieben werden, also netzwerktechnisch isoliert und nicht öffentlich über das Internet erreichbar sind. Dies wird über einen Private Endpoint ermöglicht, der eine sichere, netzwerkisolierte Verbindung ohne Internetverkehr herstellt. Diese Funktion ist besonders für Unternehmen relevant, die aus Sicherheits- oder Compliance-Gründen keine Daten über öffentliche Endpunkte fließen lassen dürfen. Die Einrichtung erfolgt in zwei Schritten: Zum einen muss der Private Endpoint direkt in Azure AI Search konfiguriert werden, zum anderen muss zusätzlich 'Virtual Network Support' in der jeweiligen Power-Platform-Umgebung eingerichtet werden, damit Copilot Studio überhaupt mit dem isolierten Netzwerk kommunizieren kann. Erst wenn beide Seiten korrekt konfiguriert sind, kann die eigentliche Verbindung in Copilot Studio wie gewohnt erstellt werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search",
      "sourceTitle": "Add Azure AI Search as a knowledge source"
    },
    {
      "id": "d2-012",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "Was ist Model Context Protocol (MCP)",
      "content": "Das Model Context Protocol (MCP) ist ein offener Standard, mit dem sich Copilot-Studio-Agenten direkt mit bestehenden Wissensservern und Datenquellen verbinden lassen, ohne dass für jede Anbindung eine komplett neue Integration gebaut werden muss. Ein verbundener MCP-Server kann drei Arten von Fähigkeiten bereitstellen: Resources (dateiartige Daten, die der Agent zur Kontextanreicherung lesen kann, etwa API-Antworten oder Dateiinhalte), Tools (aufrufbare Funktionen, mit denen das Sprachmodell konkrete Aktionen ausführen kann) und Prompts (vordefinierte Prompt-Vorlagen für bestimmte Aufgaben). Copilot Studio unterstützt aktuell davon die Nutzung von MCP-Tools und -Resources, jedoch noch nicht die Prompt-Vorlagen. MCP ist wichtig, weil es Agenten erlaubt, sich flexibel an eine wachsende Zahl externer Systeme anzudocken, ohne die Kernarchitektur des Agenten selbst ändern zu müssen – Voraussetzung dafür ist, dass generative Orchestrierung im Agenten aktiviert ist.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp",
      "sourceTitle": "Extend your agent with Model Context Protocol"
    },
    {
      "id": "d2-013",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "MCP – dynamische Aktualisierung",
      "content": "Sobald ein Agent mit einem MCP-Server verbunden ist, wird jedes Tool und jede Resource, die dieser Server veröffentlicht, automatisch in Copilot Studio nutzbar gemacht – der Server liefert dabei Name, Beschreibung, Eingaben und Ausgaben mit. Besonders wichtig ist, dass diese Verbindung dynamisch bleibt: Werden Tools oder Resources auf dem MCP-Server aktualisiert oder entfernt, spiegelt Copilot Studio diese Änderungen automatisch wider, ohne dass der Agent manuell neu konfiguriert werden muss. Dadurch werden veraltete Tools automatisch entfernt und Nutzer greifen stets auf die aktuellste Version zu. Ein einzelner MCP-Server kann dabei mehrere Tools und Resources gleichzeitig verwalten, auf die ein Copilot-Studio-Agent dann jeweils zugreifen kann. Diese Architektur reduziert Wartungsaufwand erheblich, bringt aber auch Verantwortung mit sich: Bei der Anbindung externer, nicht-Microsoft-eigener MCP-Server liegt die Verantwortung für die genutzten Tools und Ressourcen beim jeweiligen Ersteller des Agenten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp",
      "sourceTitle": "Extend your agent with Model Context Protocol"
    },
    {
      "id": "d2-014",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "MCP erfordert generative Orchestrierung",
      "content": "Model Context Protocol (MCP) ist ein offener Standard, mit dem ein Copilot-Studio-Agent sich mit externen Wissensservern und Datenquellen verbinden kann, um zusätzliche Tools, Ressourcen und Prompt-Vorlagen zu nutzen. Damit ein Agent MCP überhaupt verwenden kann, muss zuvor die generative Orchestrierung für ihn aktiviert werden – dieser Modus lässt den Agenten dynamisch entscheiden, wann und wie ein Tool aufgerufen wird, statt starren, vordefinierten Abläufen zu folgen. Ohne generative Orchestrierung fehlt dem Agenten die Fähigkeit, MCP-Tools situativ und selbstständig auszuwählen. Im Copilot-Studio-Kontext ist dies daher eine grundlegende Voraussetzung, bevor man überhaupt einen MCP-Server anbinden kann, und sollte als erster Konfigurationsschritt beim Einrichten von MCP-Erweiterungen geprüft werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp",
      "sourceTitle": "Extend your agent with Model Context Protocol"
    },
    {
      "id": "d2-015",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "MCP – unterstützte Transporttypen",
      "content": "Transporte regeln in MCP die technische Grundlage der Kommunikation zwischen Client (dem Copilot-Studio-Agenten) und Server – sie kümmern sich um das Senden und Empfangen von Nachrichten. Copilot Studio unterstützt aktuell ausschließlich den 'Streamable'-Transporttyp für MCP-Verbindungen. Der frühere Transport über Server-Sent Events (SSE) gilt im MCP-Standard mittlerweile als veraltet, weshalb Copilot Studio SSE für MCP seit August 2025 nicht mehr unterstützt. Für Personen, die einen eigenen MCP-Server anbinden oder betreiben, ist dies wichtig zu wissen, da ältere Server, die nur SSE anbieten, nicht mehr kompatibel sind und auf den Streamable-Transport umgestellt werden müssen, damit die Verbindung in Copilot Studio funktioniert.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
      "sourceTitle": "Connect your agent to an existing Model Context Protocol (MCP) server"
    },
    {
      "id": "d2-016",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "MCP-Verbindungsmethoden",
      "content": "Um einen bereits bestehenden MCP-Server an einen Copilot-Studio-Agenten anzubinden, gibt es zwei Wege. Der empfohlene Weg ist der MCP-Onboarding-Wizard direkt in Copilot Studio: Auf der Tools-Seite des Agenten wählt man 'Add a tool', dann 'New tool' und 'Model Context Protocol', woraufhin ein geführter Assistent Servername, Beschreibung, Server-URL und Authentifizierung abfragt. Alternativ kann man über Power Apps einen benutzerdefinierten Konnektor erstellen, indem man eine OpenAPI-Spezifikationsdatei (YAML) importiert, die den Server beschreibt. Diese zweite Methode ist aufwendiger, bietet aber mehr Kontrolle, etwa wenn zusätzliche Parameter benötigt werden. Beide Wege führen letztlich dazu, dass die Tools und Ressourcen des MCP-Servers im Agenten nutzbar werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
      "sourceTitle": "Connect your agent to an existing Model Context Protocol (MCP) server"
    },
    {
      "id": "d2-017",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "MCP-Authentifizierungsoptionen",
      "content": "Beim Verbinden eines MCP-Servers über den Onboarding-Wizard in Copilot Studio muss festgelegt werden, wie sich der Agent gegenüber dem Server authentifiziert, da viele MCP-Server sensible Daten oder Aktionen bereitstellen und deshalb abgesichert sind. Zur Verfügung stehen 'None' (keine Authentifizierung), 'API Key' (der Schlüssel wird entweder im Request-Header oder als Query-Parameter mitgeschickt) sowie 'OAuth 2.0'. Bei OAuth 2.0 gibt es drei Varianten: Dynamic Discovery (der Client findet die nötigen Endpunkte automatisch über einen Discovery-Endpunkt), Dynamic (der Client registriert sich selbst, die Endpunkte müssen aber manuell angegeben werden) und Manual (vollständige manuelle Konfiguration aller OAuth-Einstellungen). Die Wahl der richtigen Methode hängt davon ab, was der jeweilige MCP-Server unterstützt.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
      "sourceTitle": "Connect your agent to an existing Model Context Protocol (MCP) server"
    },
    {
      "id": "d2-018",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "MCP-Server-Schema (OpenAPI-Beispiel)",
      "content": "Wenn ein MCP-Server nicht über den Onboarding-Wizard, sondern als 'Custom Connector' in Power Apps eingebunden werden soll, benötigt man eine OpenAPI-Spezifikation im YAML-Format, die die Schnittstelle des Servers beschreibt. Ein zentrales Detail in dieser Datei ist das Attribut 'x-ms-agentic-protocol: mcp-streamable-1.0', das im Pfad-Objekt des jeweiligen Endpunkts gesetzt wird. Dieses Attribut signalisiert Copilot Studio explizit, dass es sich um einen MCP-Server mit dem unterstützten Streamable-Transport handelt, und ermöglicht damit die korrekte Kommunikation. Ohne dieses Kennzeichen würde der Connector nicht als MCP-fähig erkannt. Dieses Vorgehen ist besonders relevant, wenn Organisationen eigene MCP-Server bauen und in bestehende Power-Platform-Workflows integrieren möchten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
      "sourceTitle": "Connect your agent to an existing Model Context Protocol (MCP) server"
    },
    {
      "id": "d2-019",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-mcp",
      "topic": "MCP-Server und Data Loss Prevention",
      "content": "Der Zugriff eines Copilot-Studio-Agenten auf einen MCP-Server erfolgt technisch über Power-Platform-Konnektoren, unabhängig davon, ob der Server über den Onboarding-Wizard oder als Custom Connector angebunden wurde. Das hat eine wichtige Konsequenz für Governance und Sicherheit: Wenn eine Data-Loss-Prevention-Richtlinie (DLP) in der Organisation den Einsatz von Power-Platform-Konnektoren regelt oder einschränkt, gilt diese Richtlinie automatisch auch für den Zugriff des Agenten auf den MCP-Server und dessen Tools. Für Administratoren bedeutet dies, dass sie MCP-Zugriffe nicht separat absichern müssen, sondern über die bestehenden DLP-Richtlinien der Power Platform steuern können. Das macht MCP-Integrationen in Enterprise-Umgebungen kontrollierbar und nachvollziehbar.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent",
      "sourceTitle": "Connect your agent to an existing Model Context Protocol (MCP) server"
    },
    {
      "id": "d2-020",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – Grundkonzept",
      "content": "Computer Use ist ein Tool in Copilot Studio, das einem Agenten erlaubt, mit Websites und Desktop-Anwendungen auf einem Windows-Rechner zu interagieren, indem er wie ein Mensch Buttons anklickt, Menüs auswählt und Text in Felder eingibt – gesteuert über eine virtuelle Maus und Tastatur. Der große Vorteil: Der Agent kann auch Aufgaben erledigen, für die keine API existiert – wenn ein Mensch eine App oder Website bedienen kann, kann Computer Use es prinzipiell auch, etwa bei automatisierter Dateneingabe, Rechnungsverarbeitung oder Datenextraktion. Angetrieben wird das Ganze durch Computer-Using Agents (CUA), ein KI-Modell, das Bildverständnis (Vision) mit fortgeschrittenem Reasoning kombiniert, um Bildschirminhalte zu erkennen und sinnvoll zu bedienen. Da es KI-basiert ist, passt es sich auch an veränderte Oberflächen an und bricht nicht sofort ab, wenn sich ein Button verschiebt. Die Bedienung erfolgt über natürlichsprachliche Anweisungen, ganz ohne Programmierung.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
      "sourceTitle": "Automate web and desktop apps with computer use"
    },
    {
      "id": "d2-021",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – verfügbare Modelle",
      "content": "Für die Ausführung von Computer-Use-Aufgaben stehen in Copilot Studio mehrere KI-Modelle zur Auswahl, die jeweils unterschiedliche Reife- und Kostenstufen haben. Von OpenAI ist der Computer-Using Agent (CUA) im Standard-Tier allgemein verfügbar (GA). Von Anthropic gibt es Claude Sonnet 4.5 (Standard, ebenfalls GA), Claude Sonnet 4.6 (Standard, aber noch experimentell) sowie Claude Opus 4.6 (Premium-Tier, experimentell). Damit ein Agent überhaupt eines der Anthropic-Modelle nutzen kann, muss ein Administrator zuvor in der Power-Platform-Umgebung den Zugriff auf externe (nicht-Microsoft-)Modelle explizit aktivieren. Diese Modellauswahl ist wichtig, weil sie sowohl die Qualität der GUI-Interaktion als auch die Kosten pro Ausführungsschritt beeinflusst, da Premium-Modelle deutlich teurer abgerechnet werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
      "sourceTitle": "Automate web and desktop apps with computer use"
    },
    {
      "id": "d2-022",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – Voraussetzung generative Orchestrierung",
      "content": "Genau wie MCP setzt auch das Computer-Use-Feature voraus, dass für den jeweiligen Agenten die generative Orchestrierung aktiviert ist. Generative Orchestrierung bedeutet, dass der Agent selbstständig und dynamisch entscheidet, welches Tool er zu welchem Zeitpunkt einsetzt, statt einem starren, vorprogrammierten Gesprächsfluss zu folgen. Da Computer Use komplexe, mehrstufige GUI-Interaktionen ausführt (z. B. Formulare ausfüllen, navigieren, Daten extrahieren), braucht der Agent diese Flexibilität, um die richtigen Schritte in der richtigen Reihenfolge zu wählen. Ohne aktivierte generative Orchestrierung lässt sich Computer Use als Tool schlicht nicht hinzufügen oder nutzen. Diese Voraussetzung sollte man daher als ersten Schritt prüfen, bevor man versucht, Computer Use zu konfigurieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
      "sourceTitle": "Automate web and desktop apps with computer use"
    },
    {
      "id": "d2-023",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – Abrechnung",
      "content": "Die Nutzung von Computer Use wird über die Funktion 'Agent Action' abgerechnet, wobei jeder einzelne Ausführungsschritt (etwa Klicken, Tippen oder Navigieren) Copilot Credits verbraucht. Bei Standardmodellen (z. B. OpenAI CUA, Claude Sonnet 4.5/4.6) kostet jeder Schritt 5 Copilot Credits, bei Einsatz eines Premium-Modells wie Claude Opus 4.6 sind es 15 Copilot Credits pro Schritt. Da ein einzelner Computer-Use-Lauf oft aus mehreren Schritten besteht – etwa Browser öffnen, ein Formularfeld ausfüllen, absenden –, können sich die Kosten schnell summieren: Ein Lauf mit vier Schritten kostet bei Standardmodellen 20 Credits, bei einem Premium-Modell hingegen 60 Credits. Für Personen, die Automatisierungen im AB-620-Kontext planen, ist dieses Kostenmodell wichtig, um den Modelleinsatz bewusst gegen den Nutzen abzuwägen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
      "sourceTitle": "Automate web and desktop apps with computer use"
    },
    {
      "id": "d2-024",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – Anmeldeinformationen",
      "content": "Damit Computer Use sich bei Websites oder Anwendungen anmelden kann, muss festgelegt werden, wessen Zugangsdaten dabei verwendet werden – dies wird über die Einstellung 'Credentials to use' gesteuert. Standardmäßig ist 'Maker-provided credentials' aktiv: Der Agent nutzt die Zugangsdaten der Person, die ihn erstellt hat. Das eignet sich gut für autonome Agenten, birgt aber ein Risiko, sobald der Agent mit anderen geteilt wird, da diese dann mit den Rechten und dem Zugriff des ursprünglichen Erstellers auf der Zielmaschine agieren können. Die Alternative 'End user credentials' verlangt, dass jede Person, die den Agenten nutzt, eigene Zugangsdaten zur Zielmaschine besitzt und verwendet. Diese Entscheidung betrifft direkt die Sicherheit und Nachvollziehbarkeit von Automatisierungen, weshalb sie bei geteilten Agenten besonders sorgfältig getroffen werden sollte.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use",
      "sourceTitle": "Automate web and desktop apps with computer use"
    },
    {
      "id": "d2-025",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – Ausführungsorte (Machine-Optionen)",
      "content": "Da Computer Use auf einem Windows-Rechner läuft, muss festgelegt werden, wo genau diese Ausführung stattfindet. Copilot Studio bietet dafür drei Optionen. Der 'Hosted Browser' (Preview, basierend auf Windows 365 for Agents) erlaubt einen schnellen Start ohne eigenes Setup, läuft aber in einer von Microsoft verwalteten Umgebung ohne Anbindung an das eigene Entra-Tenant oder Intune-Richtlinien, weshalb er nicht für den produktiven Einsatz empfohlen wird. Der 'Cloud PC Pool' (ebenfalls Preview, ebenfalls über Windows 365 for Agents) bietet dagegen skalierbare, sichere und Entra-verbundene Compute-Ressourcen, die automatisch nach Workload skalieren, ohne dass eigene Maschinen bereitgestellt werden müssen. Die dritte Option, 'Bring-your-own-machine', nutzt eigene Windows-Rechner, auf denen Power Automate for Desktop installiert und die in Power Automate registriert wurden – geeignet für Organisationen mit spezifischen Anforderungen an eigene Infrastruktur.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-where-computer-use-runs",
      "sourceTitle": "Configure where computer use runs"
    },
    {
      "id": "d2-026",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – Machine-Registrierung",
      "content": "Wer die Option 'Bring-your-own-machine' für Computer Use nutzen möchte, muss zunächst Power Automate for Desktop installieren (mindestens Version 2.61.132.25266), wobei bei der Installation auch die Power-Automate-Web-Erweiterung für Browser-Interaktionen mit ausgewählt werden muss. Anschließend wird die Maschine über die App 'Power Automate machine runtime' bei der gewünschten Umgebung registriert. Erst danach lässt sich die Maschine für Computer Use freischalten: In Power Automate unter 'Machines' wählt man die registrierte Maschine aus, öffnet deren Einstellungen und aktiviert dort die Option 'Enable for computer use'. Dieser Prozess stellt sicher, dass nur bewusst dafür vorgesehene und verwaltete Maschinen für automatisierte GUI-Interaktionen genutzt werden, was insbesondere in Unternehmensumgebungen für Kontrolle und Nachvollziehbarkeit sorgt.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-where-computer-use-runs",
      "sourceTitle": "Configure where computer use runs"
    },
    {
      "id": "d2-027",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-computer-use",
      "topic": "Computer Use – Human Supervision",
      "content": "Human Supervision ist eine Sicherheitsfunktion für den Computer-Using Agent (ein Agent, der Bildschirme steuert, klickt und Formulare ausfüllt wie ein Mensch). Sie existiert, weil solche Agenten Prompt-Injection-Angriffen ausgesetzt sein können, bei denen versteckte Anweisungen in Screenshots oder Webseiten den Agenten zu unbeabsichtigten Aktionen verleiten wollen. Ist Human Supervision aktiviert, eskaliert der Agent per Outlook-E-Mail an eine konfigurierte Person, wenn er eine Bestätigung oder zusätzliche Informationen benötigt; alternativ kann inline im Aktivitätsbereich der Agentenaktivitäten reagiert werden. Da dieses Verhalten auf probabilistischem KI-Modellverhalten beruht, ist es kein verlässlicher Fail-Safe – der Agent kann sowohl unnötige als auch fehlende Rückfragen auslösen. Deaktiviert man Human Supervision, indem alle Reviewer entfernt werden, wird der Agent dadurch nicht vollständig autonom: Er pausiert weiterhin bei Bedarf, doch ohne konfigurierten Reviewer läuft die Anfrage ins Leere und die Session schlägt fehl. Im AB-620/Copilot-Studio-Kontext ist dies daher ein zentraler Governance-Baustein, um automatisierte Bildschirmsteuerung sicher und nachvollziehbar zu betreiben.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/human-supervision-computer-use",
      "sourceTitle": "Human supervision of computer use"
    },
    {
      "id": "d2-028",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-rest-apis",
      "topic": "REST API Tool – OpenAPI-Anforderung",
      "content": "Um einen Agenten in Copilot Studio um Funktionen aus einer REST-API zu erweitern, muss eine OpenAPI-Spezifikation bereitgestellt werden, die die Funktionen und verfügbaren Aktionen der API beschreibt. Diese Spezifikation ist notwendig, damit Copilot Studio versteht, welche Endpunkte existieren und wie sie aufgerufen werden können, ohne dass der Maker jede Schnittstelle manuell nachbilden muss. Wichtig dabei ist: Die Spezifikation muss im JSON-Format der Version 2 vorliegen, da die zugrunde liegende Power-Platform-Infrastruktur API-Spezifikationen auf Basis von v2 verarbeitet. Lädt ein Maker stattdessen eine v3-Spezifikation hoch, übernimmt Copilot Studio die Übersetzung automatisch in v2, sodass der Vorgang für den Nutzer transparent bleibt. Neben der Spezifikation sind zusätzlich Angaben zur benötigten Authentifizierung sowie eine Beschreibung erforderlich, die dem Sprachmodell hilft zu entscheiden, wann die API aufgerufen werden soll. Für AB-620-Prüfungszwecke ist relevant, dass REST-API-Tools sich derzeit noch im Preview-Status befinden und sowohl für Copilot- als auch für Custom Agents nutzbar sind.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
      "sourceTitle": "Extend your agent with tools from a REST API (preview)"
    },
    {
      "id": "d2-029",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-rest-apis",
      "topic": "REST API Tool – Authentifizierungstypen",
      "content": "Beim Hinzufügen eines REST-API-Tools zu einem Agenten muss festgelegt werden, wie sich der Agent gegenüber der externen API authentifiziert, denn ohne passende Authentifizierung könnte die API entweder unbefugten Zugriff zulassen oder den Zugriff komplett verweigern. Copilot Studio bietet dafür drei Optionen: 'None', wenn die API keinerlei Authentifizierung benötigt; 'API Key', bei dem der Nutzer zur Laufzeit einen Schlüssel eingibt, der entweder im Header oder als Parameter im Query-String der Anfrage übermittelt wird; und 'OAuth 2.0', bei dem einzelne Nutzer sich über einen Identitätsanbieter authentifizieren, ohne ihre Zugangsdaten direkt mit dem Agenten zu teilen. Für OAuth 2.0 müssen Client ID, Client Secret sowie die Authorization URL des Identitätsanbieters hinterlegt werden, über die der Nutzer zur Anmeldung weitergeleitet wird, bevor der Identitätsanbieter über die Callback-URL einen Autorisierungscode an den Agenten zurückgibt. Diese Auswahl ist im AB-620-Kontext wichtig, weil sie bestimmt, wie sicher und benutzerfreundlich der Zugriff auf externe Systeme über den Agenten gestaltet wird.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
      "sourceTitle": "Extend your agent with tools from a REST API (preview)"
    },
    {
      "id": "d2-030",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-rest-apis",
      "topic": "REST API Tool – Beschreibung als Orchestrierungshilfe",
      "content": "Jedes REST-API-Tool in Copilot Studio erhält eine Beschreibung, die zunächst automatisch aus der hochgeladenen OpenAPI-Spezifikation übernommen wird. Diese Beschreibung ist keine reine Dokumentation, sondern wird von der Agenten-Orchestrierung aktiv genutzt, um zur Laufzeit zu entscheiden, ob und wann dieses Tool für eine Nutzeranfrage aufgerufen werden soll. Eine zu allgemeine Beschreibung wie 'A simple service to manage tickets' liefert dem Sprachmodell zu wenig Anhaltspunkte, um das Tool zuverlässig auszuwählen. Deshalb empfiehlt Microsoft, konkrete Synonyme und Handlungsverben zu ergänzen, etwa 'get, retrieve, find, display' für Abfragen sowie 'update, change, manage' für Änderungsoperationen, sodass die Beschreibung möglichst viele Formulierungen abdeckt, mit denen Nutzer ihre Absicht ausdrücken könnten. Für AB-620 bedeutet das: Die Qualität der Tool-Beschreibung hat direkten Einfluss darauf, wie treffsicher der Agent in der Praxis das richtige Tool auswählt, und ist damit ein zentraler Hebel bei der Agentengestaltung.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api",
      "sourceTitle": "Extend your agent with tools from a REST API (preview)"
    },
    {
      "id": "d2-031",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-konnektoren",
      "topic": "Power-Platform-Konnektoren – Kategorien",
      "content": "Konnektoren aus Microsoft Power Platform fungieren als Proxys bzw. 'Wrapper' um APIs und ermöglichen es Copilot Studio, Power Automate, Power Apps und Azure Logic Apps, mit anderen Anwendungen und Diensten zu kommunizieren. Sie existieren, damit Maker nicht jede API-Integration von Grund auf selbst programmieren müssen, sondern auf vorgefertigte Verbindungen und Aktionen zurückgreifen können, um Konten zu verbinden und Workflows aufzubauen. Konnektoren werden dabei in zwei Hauptkategorien unterteilt: Prebuilt Connectors, also fertige Verbindungen zu populären Diensten, die sich wiederum in Standard-Konnektoren (z. B. SharePoint, in allen Copilot-Studio-Plänen enthalten) und Premium-Konnektoren (nur in bestimmten Plänen verfügbar) gliedern, sowie Custom Connectors, die zur Anbindung beliebiger öffentlich verfügbarer APIs dienen, für die es noch keinen fertigen Konnektor gibt. Diese Unterscheidung ist im AB-620-Kontext wichtig, um bei der Agentenplanung abzuschätzen, ob eine gewünschte Integration bereits abgedeckt ist oder eigens erstellt werden muss.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors",
      "sourceTitle": "Use connectors in Copilot Studio agents"
    },
    {
      "id": "d2-032",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-konnektoren",
      "topic": "Konnektoren als Tools und Wissensquellen",
      "content": "Konnektoren lassen sich in Copilot Studio auf mehrere Arten in einen Agenten einbinden, was ihre Flexibilität als Erweiterungsmechanismus ausmacht. Sie können auf Agenten-Ebene unter 'Tools' hinzugefügt werden, sodass sie dem gesamten Agenten zur Verfügung stehen, oder innerhalb eines einzelnen Themas (Topic) eingebunden werden, um dort gezielt eine Aktion auszulösen. Darüber hinaus lassen sich Konnektoren als Aktionen in Agent Flows nutzen, also in den automatisierten Ablaufschritten eines Agenten, und – als Preview-Funktion – sogar als Wissensquelle einsetzen, sodass der Agent über einen Konnektor bereitgestellte Daten wie eine Wissensdatenbank durchsuchen kann. Diese Vielseitigkeit erklärt, warum Konnektoren im AB-620-Curriculum ein zentrales Werkzeugkonzept sind: Sie verbinden Copilot-Studio-Agenten dynamisch mit externen Diensten und Datenquellen, ganz gleich ob es um einmalige Aktionen, wiederkehrende Automatisierungen oder Wissensabruf geht.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors",
      "sourceTitle": "Use connectors in Copilot Studio agents"
    },
    {
      "id": "d2-033",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-konnektoren",
      "topic": "Benutzerdefinierte Konnektoren erstellen",
      "content": "Nicht jede externe API wird bereits durch einen vorgefertigten Konnektor abgedeckt; für solche Fälle bietet Copilot Studio die Möglichkeit, einen benutzerdefinierten (Custom) Connector zu erstellen, der eine Verbindung zu jeder öffentlich verfügbaren API herstellen kann. Der Weg dorthin führt über die Seite 'Tools' eines Agenten: Dort wählt man 'Add a tool' und anschließend 'New tool' > 'Custom connector'. Diese Auswahl führt den Maker aus Copilot Studio heraus in den Power-Apps-Bereich 'Custom connectors', wo über 'New custom connector' die konkrete Erstellungsmethode gewählt wird, etwa der Import einer bestehenden OpenAPI-Definition. Dieser Übergang zeigt, dass Copilot Studio für tiefergehende Integrationsaufgaben eng mit der breiteren Power-Platform-Umgebung verzahnt ist. Für AB-620 ist relevant, dass Custom Connectors damit die Lücke schließen, die Prebuilt Connectors offenlassen, und Makern volle Kontrolle über die Anbindung eigener oder Nischen-APIs geben.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors",
      "sourceTitle": "Use connectors in Copilot Studio agents"
    },
    {
      "id": "d2-034",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-konnektoren",
      "topic": "Konnektoren – Maker-Anmeldeinformationen",
      "content": "Standardmäßig verlangen Konnektoren in Copilot Studio, dass jeder einzelne Endnutzer beim Gebrauch des Tools eigene Zugangsdaten für den verbundenen Dienst eingibt. Das schützt zwar die Zugriffsrechte jedes Nutzers individuell, kann aber in Szenarien unpraktisch sein, in denen alle Nutzer über eine gemeinsame, vom Maker bereitgestellte Verbindung auf einen Dienst zugreifen sollen, etwa bei einem zentral verwalteten Unternehmenskonto. Für diesen Fall lässt sich konfigurieren, dass der Agent stattdessen die Anmeldeinformationen des Makers verwendet: Voraussetzung ist ein authentifizierter Kanal für den Agenten; anschließend wird beim Konnektor-Tool unter 'Details' > 'Additional details' > 'Credentials to use' die Option 'Maker-provided credentials' ausgewählt. Danach sollte die Konfiguration im Testbereich oder im Zielkanal überprüft werden. Im AB-620-Kontext ist dieser Mechanismus wichtig, um zwischen nutzerindividueller und zentral geteilter Authentifizierung bei Konnektoren bewusst entscheiden zu können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors",
      "sourceTitle": "Use connectors in Copilot Studio agents"
    },
    {
      "id": "d2-035",
      "domainId": "d2",
      "subDomainId": "d2-sub-tools-konnektoren",
      "topic": "Konnektoren – SSO-Limitation",
      "content": "Single Sign-On (SSO) erlaubt es Nutzern normalerweise, sich einmalig anzumelden und diese Identität über mehrere Dienste hinweg zu nutzen, ohne sich mehrfach ausweisen zu müssen. Bei Konnektoren in Copilot Studio gibt es dafür jedoch eine dokumentierte Einschränkung: Wenn ein Agent benutzerdefinierte Active-Directory-Authentifizierung verwendet und gleichzeitig in Microsoft Teams bereitgestellt wird, wird SSO für Konnektoren in dieser Konfiguration nicht unterstützt. Die Konsequenz ist, dass sich Nutzer in diesem Fall bei jedem einzelnen Konnektor manuell authentifizieren müssen, statt automatisch über die bestehende Anmeldung durchgereicht zu werden. Damit die Nutzer dennoch erfolgreich verbinden können, müssen die notwendigen Verbindungen in Copilot Studio korrekt eingerichtet sein. Für AB-620 ist diese Limitation relevant, weil sie zeigt, dass Authentifizierungsentscheidungen (z. B. Wahl von Custom AD-Auth) Auswirkungen auf die Nutzererfahrung mit Konnektoren in bestimmten Kanälen wie Teams haben können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors",
      "sourceTitle": "Use connectors in Copilot Studio agents"
    },
    {
      "id": "d2-036",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Inline Agents vs. Connected Agents",
      "content": "Generative Orchestrierung in Copilot Studio unterstützt Multi-Agent-Systeme, bei denen ein Agent andere Agenten aufruft, um Probleme in mehrere spezialisierte Teile zu zerlegen und die Anwendung dadurch modularer, skalierbarer und wartbarer zu machen. Inline Agents, auch Child Agents genannt, sind kleine, wiederverwendbare Workflows innerhalb desselben Agenten – oft schlicht Topics, die der Hauptagent wie Subroutinen als einzelnen Schritt in einem größeren Plan aufruft, etwa ein 'Translate Text'-Topic. Weil Inline Agents den Kontext mit dem Hauptagenten teilen, ist der Datenaustausch zwischen ihnen einfach. Connected Agents hingegen sind eigenständige Agenten mit eigener Orchestrierung, eigenen Tools und eigenem Wissen; der Hauptagent delegiert Teile einer Anfrage an sie, zum Beispiel wenn ein IT-Agent einen Sales-Agenten für Preisinformationen anruft. Connected Agents ermöglichen Modularität und Domänentrennung und können Beschränkungen des Hauptplans umgehen, benötigen dafür aber sorgfältige Governance, da sie andere Berechtigungen oder Wissen besitzen können als der Hauptagent.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns",
      "sourceTitle": "Multi-agent orchestration patterns and best practices"
    },
    {
      "id": "d2-037",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Connected Agents – Governance-Aspekte",
      "content": "Weil Connected Agents eigenständige Berechtigungen, Tools und Wissen besitzen können, verlangt ihr Einsatz laut Microsoft sorgfältige Governance entlang vier Aspekte. Bei der Orchestrierung sollte der übergeordnete Agent klare Kriterien haben, wann er an einen Connected Agent übergibt – üblicherweise wenn die Nutzerabsicht zur Domäne des verbundenen Agenten passt; dessen Zweck sollte dem Hauptagenten wie ein eigenständiges 'agentic Tool' beschrieben werden. Beim Data Handoff wird standardmäßig der bisherige Konversationsverlauf an den Connected Agent weitergegeben, damit dieser den Kontext versteht; zusätzlich können gezielt einzelne Parameter übermittelt werden, etwa ein bereits bekannter Nutzername. Sicherheitshalber muss geprüft werden, dass ein Aufruf des Connected Agent keine Restriktionen des Hauptagenten unbeabsichtigt umgeht, etwa wenn der Connected Agent Löschrechte besitzt, die der Hauptagent selbst nicht hat. Schließlich erfordert Audit/Monitoring, dass Aufrufe protokolliert werden; da separate Transkripte für Connected Agents entstehen, müssen Telemetrie-Kennungen genutzt werden, um übergeordnete und verbundene Sitzungen zur Fehleranalyse miteinander zu korrelieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns",
      "sourceTitle": "Multi-agent orchestration patterns and best practices"
    },
    {
      "id": "d2-038",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Wann Agenten trennen",
      "content": "Microsoft rät ausdrücklich davon ab, für jede Teilaufgabe automatisch einen eigenen Agenten zu erstellen, denn separate Agenten bringen zusätzlichen Overhead mit sich – etwa eine leicht längere Ausführungszeit durch Kontextwechsel und mehr Komplexität in der Wartung mehrerer Agenten. Eine Aufteilung in separate (Connected) Agenten lohnt sich stattdessen nur, wenn mindestens eine von drei Bedingungen zutrifft: Der Teilbereich ist komplex genug, um eine eigene Sammlung an Tools oder Wissen zu benötigen (eine andere fachliche Domäne); er erfordert andere Governance-Regeln oder Zugriffskontrollen als der Hauptagent; oder er soll als eine Art Service-Agent in mehreren unterschiedlichen Hauptagenten wiederverwendet werden können. Trifft keine dieser Bedingungen zu, kann ein einfacher Inline-Agent die Aufgabe ebenso gut und mit weniger Komplexität erledigen. Die empfohlene praktische Vorgehensweise lautet daher, zunächst mit einem einzigen Agenten zu beginnen und erst dann in mehrere Agenten aufzuteilen, wenn ein klarer Bedarf an Modularität oder eine Grenze erkennbar wird, die ein einzelner Agent nicht überschreiten sollte.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns",
      "sourceTitle": "Multi-agent orchestration patterns and best practices"
    },
    {
      "id": "d2-039",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Best Practice: Single Response Principle",
      "content": "Das Single Response Principle ist eine der zentralen Best Practices für Multi-Agent-Orchestrierung in Copilot Studio und legt fest, dass pro Konversationsrunde nur ein Agent mit dem Nutzer kommunizieren darf. In einem Multi-Agent-Setup ist dies der übergeordnete (Parent) Agent, der als Einziger die finale Antwort liefert, während Subagenten als 'Researcher' fungieren, die Informationen sammeln, aber keine eigene Antwort an den Nutzer senden. Dieses Prinzip existiert, weil Subagenten nicht von selbst wissen, dass sie Teil einer Orchestrierung sind, und ohne explizite Anweisung wie eigenständige Agenten agieren würden, die direkt an den Nutzer antworten – was zu doppelten oder unvollständigen Nachrichten führt. Microsoft empfiehlt deshalb, den Hauptagenten explizit anzuweisen, Ergebnisse aller Subagenten zu einer einzigen Antwort zusammenzuführen, und jedem Subagenten ausdrücklich mitzuteilen, dass er nicht direkt antworten darf. Zusätzlich wird empfohlen, klare und direktive Formulierungen (MUSS, NIEMALS, NUR) statt weicher Formulierungen zu verwenden, da Systemanweisungen mit starker Sprache im Konfliktfall priorisiert werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns",
      "sourceTitle": "Multi-agent orchestration patterns and best practices"
    },
    {
      "id": "d2-040",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Best Practice: eindeutige Wissensquellen pro Subagent",
      "content": "In einem Multi-Agent-Setup mit generativer Orchestrierung ruft ein Hauptagent (Parent) mehrere spezialisierte Subagenten auf, um Aufgaben aufzuteilen und die Lösung modularer und wartbarer zu machen. Eine der zentralen Best Practices dafür lautet, jedem Subagenten eine eigene, nicht überlappende Wissensquelle zuzuweisen. Der Grund: Greifen zwei Subagenten auf dieselbe Wissensbasis oder Dataverse-Tabelle zu, findet meist einer die Antwort zuerst, während der zweite entweder dieselbe Information dupliziert oder mangels Treffer keinen Mehrwert liefert. Steht nur eine Wissensquelle zur Verfügung, sollte man stattdessen einen einzelnen Agenten mit Wissen statt zwei Subagenten verwenden, da Multi-Agent-Architekturen nur bei wirklich unterschiedlichen Quellen einen Nutzen bringen. Im AB-620/Copilot-Studio-Kontext ist diese Regel Teil eines größeren Best-Practice-Katalogs zur Multi-Agent-Orchestrierung, der auch klare Rollenbeschreibungen, eindeutige Anweisungen und ein 'Single Response'-Prinzip für den Parent-Agenten umfasst.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns",
      "sourceTitle": "Multi-agent orchestration patterns and best practices"
    },
    {
      "id": "d2-041",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Andere Agenten hinzufügen – Überblick",
      "content": "Copilot Studio erlaubt es, einen bestehenden Agenten durch die Anbindung weiterer Agenten zu erweitern, damit Nutzeranfragen oder automatische Trigger an spezialisierte Teilagenten weitergereicht werden können. Das ist sinnvoll, um Lösungen modular aufzubauen und Aufgaben oder Datenbereiche gezielt an dafür ausgerichtete Agenten zu delegieren, statt einen einzigen Agenten mit allem zu überladen. Es gibt dafür mehrere Wege: das Erstellen von Child Agents als leichtgewichtige Teilagenten innerhalb des Hauptagenten, das Verbinden mit anderen Copilot-Studio-Agenten in derselben Umgebung, sowie das Verbinden mit externen Agenten wie A2A-fähigen Agenten, Microsoft-Foundry-Agenten, Fabric-Data-Agenten und mit dem Microsoft-365-Agents-SDK gebauten Agenten. Alle hinzugefügten Agenten erscheinen zentral auf der Seite 'Agents' des Hauptagenten. Die Anbindung von Foundry-, Fabric- und Microsoft-365-Agents-SDK-Agenten befindet sich aktuell im Public-Preview-Status, ist also funktional noch nicht final und kann sich ändern.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents",
      "sourceTitle": "Add other agents overview - Microsoft Copilot Studio"
    },
    {
      "id": "d2-042",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Verbindung zu Microsoft Foundry Agent",
      "content": "Ein Microsoft-Foundry-Agent lässt sich über die Seite 'Agents' des Hauptagenten mittels 'Add an agent' > 'Connect to an external agent' > 'Microsoft Foundry' anbinden, wodurch der Hauptagent den Foundry-Agenten zur Beantwortung von Nutzeranfragen oder Triggern aufrufen kann. Beim Einrichten der Verbindung wird die Foundry-Project-Endpoint-URL benötigt, anschließend Name, Beschreibung und die Agent-Id des konkreten Foundry-Agenten angegeben. Wichtig dabei ist, dass nur Agenten aus dem neuen Microsoft-Foundry-Portal unterstützt werden – ein Agent aus dem alten Portal führt zu einem Fehler '404 - Version not found', was in der Praxis eine häufige Fehlerquelle bei der Einrichtung ist. Für den AB-620-Kontext ist relevant, dass eine präzise Beschreibung des Foundry-Agenten dem Hauptagenten hilft, richtig zu erkennen, wann er ihn aufrufen soll, besonders wenn mehrere Tools oder Agenten mit ähnlichen Zwecken vorhanden sind.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent",
      "sourceTitle": "Connect to a Microsoft Foundry agent (preview)"
    },
    {
      "id": "d2-043",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Verbindung zu Microsoft Fabric Data Agent",
      "content": "Ein Microsoft-Fabric-Data-Agent kann als Connected Agent in einen Copilot-Studio-Agenten eingebunden werden, damit dieser bei Bedarf auf strukturierte Unternehmensdaten aus Fabric zugreift, um Nutzeranfragen zu beantworten. Der Weg dorthin führt über die Seite 'Agents' des Hauptagenten mit 'Add an agent', der Auswahl von 'Microsoft Fabric' unter 'Connect to an external agent', der Auswahl bzw. dem Neuanlegen einer Verbindung zwischen Fabric und Copilot Studio und schließlich der Auswahl des gewünschten Data Agents aus der Liste der zugänglichen Agenten. Diese Anbindung ermöglicht echte Agent-zu-Agent-Zusammenarbeit: Der Copilot-Studio-Agent kann so sicher auf Unternehmensdaten zugreifen und seine Antworten in organisatorischem Wissen verankern, was Genauigkeit und Relevanz verbessert. Die Funktion befindet sich aktuell im Preview-Stadium.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent",
      "sourceTitle": "Connect to a Microsoft Fabric Data agent (preview)"
    },
    {
      "id": "d2-044",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Fabric Data Agent – Voraussetzungen zum Anzeigen",
      "content": "Damit ein Fabric-Data-Agent überhaupt in der Auswahlliste beim Hinzufügen zu einem Copilot-Studio-Agenten auftaucht, müssen mehrere Voraussetzungen erfüllt sein. Der Data Agent muss in Microsoft Fabric veröffentlicht sein und funktionieren, der Nutzer muss mit demselben Konto in Fabric und Copilot Studio angemeldet sein, das mit dem Data Agent verknüpft ist, und Fabric-Data-Agent sowie Copilot-Studio-Instanz müssen auf demselben Tenant liegen. Zusätzlich braucht der Nutzer ausreichende Berechtigungen: mindestens Lesezugriff auf den Data Agent selbst, die Berechtigung, Agenten in Copilot Studio zu erstellen und zu ändern, sowie Zugriff auf die zugrunde liegenden Datenquellen des Data Agents. Diese Prüfliste ist im AB-620-Kontext wichtig, weil fehlende Konfiguration in genau einem dieser Punkte typischerweise dazu führt, dass der gewünschte Agent in Copilot Studio schlicht nicht sichtbar ist, ohne dass eine klare Fehlermeldung erscheint.",
      "sourceUrl": "https://learn.microsoft.com/en-us/fabric/data-science/data-agent-microsoft-copilot-studio",
      "sourceTitle": "Consume a data agent in Microsoft Copilot Studio (preview)"
    },
    {
      "id": "d2-045",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Fabric Data Agent – Compliance-Hinweis",
      "content": "Wenn ein Copilot-Studio-Agent einen Fabric-Data-Agenten als Connected Agent nutzt, verlassen die vom Data Agent zurückgelieferten Antworten unter Umständen die Compliance-Grenze bzw. die geografische Region, in der Fabric die Daten normalerweise verarbeitet und speichert. Stattdessen werden diese Antworten gemäß den geltenden Nutzungsbedingungen und Datenrichtlinien von Microsoft Copilot Studio verarbeitet oder gespeichert, was faktisch bedeutet, dass für Compliance zwei unterschiedliche Regelwerke relevant werden – jenes von Fabric und jenes von Copilot Studio. Dieser Hinweis ist besonders wichtig für Organisationen mit strengen Datenresidenz- oder Compliance-Anforderungen, da die Nutzung eines Fabric-Data-Agents über Copilot Studio faktisch einen zusätzlichen Datenfluss über Systemgrenzen hinweg erzeugt, der beim Design einer Agentenlösung explizit berücksichtigt werden muss.",
      "sourceUrl": "https://learn.microsoft.com/en-us/fabric/data-science/data-agent-microsoft-copilot-studio",
      "sourceTitle": "Consume a data agent in Microsoft Copilot Studio (preview)"
    },
    {
      "id": "d2-046",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "Agent2Agent (A2A) Protokoll – Definition",
      "content": "Das Agent2Agent-Protokoll (A2A) ist ein offener Standard, der die Kommunikation und Zusammenarbeit zwischen unterschiedlichen KI-Agenten definiert, unabhängig davon, mit welchem Framework sie gebaut wurden. Es existiert, weil klassische HTTP-Verbindungen zwar für einfache API-Aufrufe funktionieren, aber nicht für agentenspezifische Workflows ausgelegt sind: A2A ermöglicht es einem Orchestrator, Aufgaben an externe Agenten zu senden, dabei reiche strukturierte Metadaten mitzugeben und Antworten in einem vorhersehbaren Format zurückzuerhalten. Im Gegensatz zu einer traditionellen HTTP-Anbindung unterstützt A2A mehrstufige (multiturn) Interaktionen und liefert deutlich reichhaltigere kontextuelle Metadaten, statt nur einzelne, isolierte API-Aufrufe zu erlauben. Für Copilot Studio bedeutet das: Über A2A kann ein Hauptagent echte Aufgaben an einen externen, auf einem anderen Framework laufenden Agenten delegieren statt bloß eine API abzufragen, was A2A besonders für Agenten interessant macht, die außerhalb von Copilot Studio gehostet sind und eigene domänenspezifische Logik mitbringen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
      "sourceTitle": "Connect an agent available over the Agent2Agent (A2A) protocol"
    },
    {
      "id": "d2-047",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "A2A-Verbindung – Vorgehen und Agent Card",
      "content": "Um einen externen Agenten über das A2A-Protokoll an Copilot Studio anzubinden, wählt man auf der Agents-Seite 'Add an agent' > 'Connect to an external agent' > 'Agent2Agent' und gibt anschließend die Endpoint-URL des A2A-Agenten ein – ausdrücklich die Endpunkt-URL für die Kommunikation, nicht die URL der sogenannten Agent Card. Besitzt der Zielagent eine gültige Agent Card unter der Standard-'.well-known'-URL (also unter Endpoint-URL plus '/.well-known/agent.json'), liest Copilot Studio Name und Beschreibung automatisch aus dieser Karte aus und trägt sie in das Formular ein. Werden Name und Beschreibung nicht automatisch befüllt, kann das daran liegen, dass keine Agent Card vorhanden ist, sie an einer anderen URL liegt oder ein Kommunikationsproblem vorliegt; in diesem Fall müssen Name und Beschreibung manuell und möglichst aussagekräftig ergänzt werden, damit der Hauptagent später erkennt, wann er den externen Agenten aufrufen soll. Zusätzlich lässt sich beim Einrichten eine Authentifizierungsmethode wählen: keine, API-Key oder OAuth 2.0, je nachdem wie der Zielagent abgesichert ist.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
      "sourceTitle": "Connect an agent available over the Agent2Agent (A2A) protocol"
    },
    {
      "id": "d2-048",
      "domainId": "d2",
      "subDomainId": "d2-sub-multi-agent-a2a",
      "topic": "A2A-Nachrichten-Metadaten",
      "content": "Wenn Copilot Studio über das A2A-Protokoll eine Aufgabe an einen externen Agenten delegiert, sendet es dabei nicht nur die reine Nutzeranfrage, sondern eine strukturierte Nachricht mit reichhaltigen Metadaten. Dazu gehören eine eindeutige contextId zur Identifikation der Konversation, Message-IDs für einzelne Nachrichten, Locale-Informationen zur Sprache bzw. Region des Nutzers sowie der vollständige Chatverlauf statt nur der letzten Nutzeräußerung. Diese Metadaten existieren, damit der externe A2A-Agent den vollen Gesprächskontext versteht und darauf reagieren kann, statt jede Anfrage isoliert ohne Vorgeschichte zu behandeln. Praktisch kann ein externer Agent diese Informationen z. B. für Routing-Entscheidungen, Personalisierung oder ein insgesamt kontextbewussteres Verhalten über mehrere Gesprächsrunden hinweg nutzen, was klassische einzelne HTTP-Aufrufe ohne Sitzungskontext nicht ermöglichen würden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent",
      "sourceTitle": "Connect an agent available over the Agent2Agent (A2A) protocol"
    },
    {
      "id": "d2-049",
      "domainId": "d2",
      "subDomainId": "d2-sub-azure-integration",
      "topic": "Azure AI Foundry Modelle für Prompts",
      "content": "Die Funktion 'Azure AI Foundry models for prompts' ist eine native Integration, die aktuellste Modelle aus Azure AI Foundry direkt in Copilot-Studio-Prompts verfügbar macht, statt Nutzer auf die vorkonfigurierten Standardmodelle zu beschränken. Damit stehen unter anderem OpenAI GPT-4.5, Llama- und DeepSeek-Modelle sowie insgesamt mehr als 1.800 weitere Modelle aus dem Azure-AI-Foundry-Modellkatalog zur Verfügung, wodurch Copilot Studio zu einem zentralen Ort wird, um unterschiedlichste KI-Fähigkeiten – von Open-Source-Modellen bis zu branchenspezifischen oder aufgabenspezifischen Modellen – für eigene Agenten zu nutzen. Beim Verbinden eines solchen Modells über den Prompt-Tool-Dialog müssen der Model Deployment Name und der Base Model Name exakt so eingegeben werden, wie sie in Azure AI Foundry hinterlegt sind, da schon kleine Abweichungen zu Verbindungsfehlern führen können. Im AB-620-Kontext erweitert diese Funktion die Möglichkeiten von Copilot Studio deutlich über die eingebauten Modelle hinaus und macht die Plattform für anspruchsvollere, modellspezifische Anwendungsfälle nutzbar.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
      "sourceTitle": "Bring your own model for your prompts - Microsoft Copilot Studio"
    },
    {
      "id": "d2-050",
      "domainId": "d2",
      "subDomainId": "d2-sub-azure-integration",
      "topic": "Foundry-Modelle für Prompts – Einschränkungen",
      "content": "Beim Verbinden eines eigenen Azure-AI-Foundry-Modells für Copilot-Studio-Prompts gelten wichtige technische Einschränkungen, die man kennen muss, um Fehlkonfigurationen zu vermeiden. Zum einen unterstützt die Funktion ausschließlich Modelle vom Typ 'Chat Completion': Die angegebene Azure-Modell-Endpunkt-URL muss auf den Chat-Completions-Endpunkt zeigen, der auf '/chat/completions' endet. Wird stattdessen die neuere Responses-API verwendet, deren Endpunkt auf '/openai/v1/responses' endet, schlägt die Verbindung mit dem Fehler 'Resource not found' fehl – die Lösung ist, die URL auf den Chat-Completions-Endpunkt umzustellen. Zum anderen werden GPT-5 und alle nachfolgenden Modellversionen (etwa GPT-5 mini, GPT-5 nano oder GPT-5.x) aktuell nicht für 'Bring your own model' in Prompts unterstützt. Diese Einschränkungen sind für die Praxis relevant, weil sie erklären, warum eine augenscheinlich korrekt eingerichtete Verbindung dennoch fehlschlagen kann, wenn der falsche API-Typ oder eine nicht unterstützte Modellversion verwendet wird.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts",
      "sourceTitle": "Bring your own model for your prompts - Microsoft Copilot Studio"
    },
    {
      "id": "d2-051",
      "domainId": "d2",
      "subDomainId": "d2-sub-azure-integration-monitoring",
      "topic": "Application Insights – Voraussetzungen",
      "content": "Application Insights ist ein Azure-Monitoring-Dienst, mit dem sich zusätzlich zu den nativen Analysefunktionen von Copilot Studio detaillierte Telemetriedaten über einen Agenten (Bot) sammeln lassen, etwa um Nutzungsmuster oder Fehler tiefergehend zu analysieren. Damit diese Anbindung funktioniert, muss die Copilot-Studio-Instanz zunächst mit einem Azure-App-Service verbunden sein, und der Nutzer benötigt Zugriff auf die zugehörige Application-Insights-Ressource im Azure-Portal. Den Ressourcennamen und den zugehörigen Schlüssel der App-Insights-Ressource findet man dabei auf der Einstellungsseite des Agenten unter dem Bereich 'Analytics'. Diese Voraussetzung ist der Ausgangspunkt für alle weiterführenden Auswertungen: Ohne eine korrekt verbundene App-Service-Instanz und die passenden Zugangsdaten lassen sich später keine Kusto-Abfragen gegen die Telemetriedaten des Agenten ausführen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/dynamics365/guidance/resources/copilot-studio-appinsights",
      "sourceTitle": "Application Insights telemetry with Microsoft Copilot Studio"
    },
    {
      "id": "d2-052",
      "domainId": "d2",
      "subDomainId": "d2-sub-azure-integration-monitoring",
      "topic": "Application Insights – erfasste Telemetriedaten",
      "content": "Sobald ein Copilot-Studio-Agent mit Application Insights verbunden ist, erfasst der Dienst mehrere Kategorien von Telemetriedaten, die tiefe Einblicke in das Verhalten und die Nutzung des Agenten liefern. Dazu gehören protokollierte Nachrichten und Events, die zwischen Nutzer und Agent ausgetauscht werden, die während Gesprächen ausgelösten Topics sowie benutzerdefinierte Telemetrie-Events, die gezielt aus einzelnen Topics heraus gesendet werden können. Um diese Rohdaten auszuwerten, wird Kusto (KQL, Kusto Query Language) verwendet – eine Abfragesprache, mit der sich im Azure-Portal komplexe Datenanalysen und -manipulationen durchführen lassen, deren Ergebnisse als Tabellen, Diagramme oder Karten dargestellt werden können. Damit lassen sich zum Beispiel typische Fragen beantworten wie: Welche Topics werden am häufigsten aufgerufen, wie zufrieden sind Nutzer mit den Antworten, wie oft wird an einen menschlichen Mitarbeiter eskaliert, oder welche Fehler treten wiederkehrend auf.",
      "sourceUrl": "https://learn.microsoft.com/en-us/dynamics365/guidance/resources/copilot-studio-appinsights",
      "sourceTitle": "Application Insights telemetry with Microsoft Copilot Studio"
    },
    {
      "id": "d2-053",
      "domainId": "d2",
      "subDomainId": "d2-sub-azure-integration-monitoring",
      "topic": "Application Insights – Generative-Answers-Telemetrie",
      "content": "Für die generative Antwortfunktion (Generative Answers) protokolliert Copilot Studio eigene Custom Events mit dem Namen 'GenerativeAnswers' in Application Insights, die speziell Interaktionen und Ergebnisse dieser KI-generierten Antworten abbilden. Aus dem customDimensions-Feld dieser Events lassen sich per KQL-Abfrage strukturierte Werte extrahieren, etwa die conversationId zur Zuordnung des Gesprächs, der TopicName, der eigentliche Message-Inhalt, das Result sowie ein Feedback-Wert, der aus serialisierten Daten herausgelöst wird. Eine Beispiel-Abfrage filtert gezielt auf Events mit dem Namen 'GenerativeAnswers', wandelt die customDimensions in ein dynamisches Objekt um und extrahiert daraus die relevanten Felder, sortiert nach Zeitstempel. Diese Auswertung ist besonders wertvoll, um nachzuvollziehen, wie gut generative Antworten bei Nutzern ankommen und wo eventuell nachgebessert werden muss.",
      "sourceUrl": "https://learn.microsoft.com/en-us/dynamics365/guidance/resources/copilot-studio-appinsights",
      "sourceTitle": "Application Insights telemetry with Microsoft Copilot Studio"
    },
    {
      "id": "d2-054",
      "domainId": "d2",
      "subDomainId": "d2-sub-azure-integration-monitoring",
      "topic": "Unified Monitoring über Application Insights",
      "content": "Die 'Agent details'-Ansicht in Application Insights bietet eine vereinheitlichte Monitoring-Erfahrung für KI-Agenten über mehrere Quellen hinweg, darunter Microsoft Foundry, Copilot Studio und Agenten von Drittanbietern. Sie existiert, weil in komplexen Umgebungen mit mehreren Agenten-Plattformen sonst jede Quelle getrennt überwacht werden müsste; stattdessen konsolidiert diese Ansicht Telemetrie und Diagnosedaten zentral, sodass sich Agenten-Performance verfolgen, Token-Nutzung und Kosten analysieren sowie Fehler übergreifend beheben lassen. Die Grundlage dafür bilden OpenTelemetry-Generative-AI-Semantics, ein offener Standard für die Beobachtbarkeit generativer KI-Systeme. In der End-to-End-Transaktionsansicht lassen sich einzelne Agentenläufe im Detail nachvollziehen, inklusive aufgerufenem Agent, zugrunde liegendem Sprachmodell und ausgeführten Tools, und über 'Explore in Grafana' stehen zusätzlich vorgefertigte Dashboards für tiefere Anpassungen zur Verfügung.",
      "sourceUrl": "https://learn.microsoft.com/en-us/azure/azure-monitor/app/agents-view",
      "sourceTitle": "Monitor AI Agents with Application Insights - Azure"
    },
    {
      "id": "d3-001",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Testfenster (Test your agent panel)",
      "content": "Das Testfenster (Test your agent panel) ist der zentrale Ort in Copilot Studio, an dem man während der Entwicklung eines Agenten dessen Verhalten direkt ausprobieren kann. Es existiert, weil das Erstellen eines Agenten ein iterativer Prozess ist: Man ändert Topics oder Einstellungen und muss sofort sehen können, ob die Konversation wie geplant abläuft, ohne den Agenten dafür veröffentlichen zu müssen. Im Testchat gibt man Text ein, der wie bei einem echten Nutzer eine Trigger-Phrase auslösen kann, worauf das zugehörige Topic startet. Wählt man eine Antwort des Agenten im Testchat aus, springt man direkt zum auslösenden Knoten im Topic-Editor, was das Debuggen sehr erleichtert, da man den genauen Ursprung einer Antwort sofort sieht. Ausgelöste Knoten werden zudem mit einem farbigen Häkchen und einer farbigen Umrandung markiert, sodass der Konversationsverlauf visuell nachvollziehbar bleibt. Im AB-620-Kontext ist dieses Panel damit das wichtigste Werkzeug, um Topics vor der Veröffentlichung zu validieren und Fehler frühzeitig zu erkennen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot",
      "sourceTitle": "Test your agent - Microsoft Copilot Studio"
    },
    {
      "id": "d3-002",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Track between topics / Tracking between topics",
      "content": "'Track between topics' (auch 'Tracking between topics' genannt) ist eine Option im Testpanel, die automatisch den gesamten Konversationsverlauf verfolgt, auch wenn dieser von einem Topic zum nächsten wechselt. Sie existiert, weil reale Konversationen selten in einem einzigen Topic verbleiben, sondern oft mehrere Topics nacheinander durchlaufen, etwa wenn ein Nutzer eine Frage stellt, die ein anderes Topic auslöst; ohne diese Funktion müsste man den Übergang manuell nachvollziehen. Ist die Option aktiviert, zeigt die Activity Map die Knoten innerhalb eines Topics, während dieses als Teil eines größeren Plans ausgeführt wird, sodass der gesamte Fluss sichtbar bleibt. Man kann die Funktion aber auch bewusst ausschalten, wenn man sich beim Testen gezielt nur auf ein einzelnes Topic konzentrieren möchte, ohne durch Sprünge zu anderen Topics abgelenkt zu werden. Im AB-620-Kontext hilft diese Einstellung dabei, komplexe mehrstufige Dialoge nachzuvollziehen oder isoliert ein einzelnes Topic sauber zu testen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot",
      "sourceTitle": "Test your agent - Microsoft Copilot Studio"
    },
    {
      "id": "d3-003",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Track between topics in der Activity Map",
      "content": "Die Activity Map ist eine visuelle Darstellung des Ausführungsplans eines Agenten, bei der jeder Schritt als eigener Knoten abgebildet wird. Aktiviert man beim Testen die Option 'Track between topics', erweitert sich diese Darstellung: Sie zeigt dann auch die Knoten innerhalb eines Topics, während dieses als Teil eines größeren Plans ausgeführt wird, sodass sich der gesamte Konversationsfluss über mehrere Topics hinweg überwachen lässt. Das ist wichtig, weil moderne Copilot-Studio-Agenten mit generativer Orchestrierung dynamisch entscheiden, welches Topic als nächstes zum Einsatz kommt, und man diesen Entscheidungspfad nachvollziehen möchte. Eine wichtige Einschränkung dabei ist jedoch, dass Aktivitäten der generativen Orchestrierung, die innerhalb eines Topics stattfinden, in der Activity Map nicht separat sichtbar werden. Für AB-620-Prüflinge bedeutet das: Die Activity Map zeigt zuverlässig den Topic-Wechsel, aber nicht jede interne KI-Entscheidung innerhalb eines Topics.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity",
      "sourceTitle": "Review agent activity - Microsoft Copilot Studio"
    },
    {
      "id": "d3-004",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Automatisiertes Testen aus dem Testchat starten",
      "content": "Manuelles Testen im 'Test your agent'-Panel ist gut geeignet, um einzelne Konversationen durchzuspielen, wird aber schnell aufwendig, wenn viele verschiedene Anfragen regelmäßig überprüft werden sollen. Aus diesem Grund bietet Copilot Studio die Möglichkeit, Testsets mit mehreren Abfragen zu erstellen, die automatisiert ausgewertet werden können, statt jede Frage einzeln von Hand einzutippen. Gestartet wird ein solcher automatisierter Test direkt über das Evaluate-Symbol im Testchat, wodurch der Übergang vom manuellen Ausprobieren zur systematischen Qualitätssicherung nahtlos erfolgt. Die dabei verwendeten Testfragen können sogar aus zuvor im Testchat gestellten Anfragen übernommen werden, was den Aufwand für die Erstellung von Testsets reduziert. Im AB-620-Kontext ist dies der Übergang von der Ad-hoc-Validierung während der Entwicklung hin zu einer wiederholbaren, dokumentierten Qualitätsprüfung des Agenten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot",
      "sourceTitle": "Test your agent - Microsoft Copilot Studio"
    },
    {
      "id": "d3-005",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Variablenwerte während des Testens beobachten",
      "content": "Variablen speichern in Copilot Studio Informationen, die während einer Konversation gesammelt oder verarbeitet werden, etwa Nutzereingaben oder Ergebnisse von Aktionen. Damit man nachvollziehen kann, ob ein Topic diese Werte korrekt setzt und weiterverarbeitet, bietet das Testpanel ein eigenes Variablen-Panel mit einem 'Test'-Tab. Dort lassen sich die verschiedenen Variablenkategorien (z. B. globale, Umgebungs-, System- oder benutzerdefinierte Variablen) aufklappen und deren aktuelle Werte live während der laufenden Testkonversation beobachten. Möchte man mehr Details zu einer bestimmten Variable erfahren, kann man sie auswählen, um das Panel 'Variable properties' mit weiteren Eigenschaften zu öffnen. Für AB-620 ist dieses Feature zentral, um Logikfehler zu finden, etwa wenn eine Variable unerwartet leer bleibt oder nicht den erwarteten Wert erhält.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot",
      "sourceTitle": "Test your agent - Microsoft Copilot Studio"
    },
    {
      "id": "d3-006",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Snapshot der Konversation speichern",
      "content": "Beim Testen eines Agenten treten manchmal Probleme auf, die sich nicht sofort im Testfenster klären lassen und eine tiefere Analyse erfordern. Für solche Fälle bietet Copilot Studio die Funktion 'Save snapshot', die über das Drei-Punkte-Menü im Testpanel aufgerufen wird und den Inhalt der aktuellen Konversation zusammen mit Diagnosedaten sichert. Das Ergebnis ist eine Datei namens botContent.zip, die zwei Bestandteile enthält: dialog.json mit detaillierten Konversationsdiagnosen inklusive Fehlerbeschreibungen, sowie botContent.yml mit den Topics und weiterem Agenteninhalt wie Entitäten und Variablen. Wichtig zu wissen ist, dass diese Snapshot-Datei sämtlichen Agenteninhalt enthalten kann, worunter auch sensible Informationen fallen können, weshalb ein entsprechender Warnhinweis erscheint. Im AB-620-Kontext dient dieser Snapshot dazu, Fehler nicht nur im Moment des Auftretens, sondern auch später oder durch andere Personen nachvollziehbar zu analysieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot",
      "sourceTitle": "Test your agent - Microsoft Copilot Studio"
    },
    {
      "id": "d3-007",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Grenzen des Testpanels bei Inaktivitäts-Triggern",
      "content": "Das 'Test your agent'-Panel ist ein Werkzeug für die Design-Time-Validierung, das heißt, es hilft dabei, die Konfiguration eines Agenten während der Entwicklung zu überprüfen. Es bildet jedoch nicht sämtliches Verhalten ab, das ein veröffentlichter Agent in einem echten Kanal zeigen würde. Konkret können zeitbasierte oder hintergrundausgelöste Ereignisse, zu denen auch Inaktivitäts-Trigger zählen, im Testpanel ausbleiben oder nicht wie erwartet feuern, selbst wenn der Agent korrekt konfiguriert wurde. Das ist wichtig zu wissen, weil man sonst fälschlicherweise annehmen könnte, eine Funktion sei fehlerhaft, obwohl sie nur im Testpanel technisch nicht simulierbar ist. Um solches zeitgesteuertes Verhalten zuverlässig zu validieren, muss der Agent tatsächlich veröffentlicht und in einem unterstützten Kanal wie Microsoft Teams getestet werden. Für AB-620 bedeutet das: Das Testpanel darf nicht als abschließende Bestätigung für inaktivitätsbasierte Szenarien herangezogen werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot",
      "sourceTitle": "Test your agent - Microsoft Copilot Studio"
    },
    {
      "id": "d3-008",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Real-time Activity Map",
      "content": "Eine Activity Map ist eine visuelle Abbildung des Ablaufs, den ein Agent bei der Bearbeitung einer Anfrage durchläuft, wobei jede sogenannte Aktivität beginnt, sobald der Agent eine Konversation startet oder durch ein externes Ereignis ausgelöst wird. Jeder einzelne Schritt innerhalb dieser Aktivität wird dabei als eigener Knoten dargestellt. Sie existiert, weil das Erstellen von Agenten ein iterativer Prozess ist, bei dem man verstehen muss, welche Entscheidungen der Agent trifft, um Probleme und Verbesserungspotenziale zu erkennen. Während des Testens zeigt die Real-Time-Variante der Activity Map den vom Agenten generierten Plan live an und hebt dabei Fehler hervor, etwa fehlende oder ungültige Ein- oder Ausgabeparameter von Aktionen, außerdem die Ausführungsdauer jedes einzelnen Schritts. Diese Funktion steht ausschließlich für Agenten zur Verfügung, bei denen die generative Orchestrierung aktiviert ist. Im AB-620-Kontext ist die Activity Map damit ein zentrales Diagnosewerkzeug, um zu verstehen, welche Aktion der Agent zur Beantwortung einer bestimmten Anfrage gewählt hat und ob dabei Fehler aufgetreten sind.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity",
      "sourceTitle": "Review agent activity - Microsoft Copilot Studio"
    },
    {
      "id": "d3-009",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Chain of Thought im Testchat",
      "content": "Die Chain-of-Thought-Funktion (CoT) gibt beim Testen eines Agenten Einblick in dessen Denkprozess, indem sie die Zwischenschritte, Überlegungen und Entscheidungen anzeigt, die der Agent trifft, während er eine Eingabe verarbeitet und eine Antwort erzeugt. Sie existiert, weil komplexe Interaktionen und das Debuggen von Agentenverhalten schwierig sind, wenn man nur das Endergebnis sieht, aber nicht den Weg dorthin nachvollziehen kann. Bevor der Agent im Testpanel antwortet, wird die Argumentationskette angezeigt, sodass man sehen kann, wie der Agent zu seiner Antwort gelangt ist. Wichtig ist dabei die Einschränkung, dass diese Funktion nur für ausgewählte Modelle verfügbar ist, konkret etwa GPT-5 Reasoning, Claude Sonnet und Claude Opus, und nicht generell für jedes im Agenten verwendete Modell funktioniert. Im AB-620-Kontext ist Chain of Thought damit ein Hilfsmittel für tiefere Fehleranalysen bei komplexen, mehrstufigen Entscheidungen des Agenten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity",
      "sourceTitle": "Review agent activity - Microsoft Copilot Studio"
    },
    {
      "id": "d3-010",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Historische Agentenaktivität (Activity-Seite)",
      "content": "Neben der Echtzeit-Ansicht während des Testens gibt es die Activity-Seite, die jede Aktivität eines Agenten in Echtzeit aufzeichnet und dauerhaft speichert, sobald sie beginnt. Diese Seite existiert, damit man nach dem Testen oder im laufenden Betrieb zurückblicken und die Interaktionen sowie die Entscheidungen des Agenten überprüfen kann, um abweichendes Verhalten zu finden, Ausführungsdauern einzelner Aktivitäten einzusehen und Fehlerdetails zu erhalten. Historische Aktivität ist dabei nicht auf einen Kanal beschränkt: Sie steht für Interaktionen im Copilot-Studio-Testchat ebenso zur Verfügung wie für Agenten, die in Microsoft Teams, Microsoft 365 Copilot oder SharePoint veröffentlicht wurden, sowie für Aktivitäten, die durch einen autonomen Trigger gestartet wurden. Die Activity-Liste zeigt dabei unter anderem den Namen der interagierenden Person, den Kanal, das Datum, die Anzahl abgeschlossener Schritte, den letzten Schritt und den Status der Aktivität. Für AB-620 ist diese Seite damit das zentrale Werkzeug, um das Verhalten eines Agenten über verschiedene Kanäle und Zeiträume hinweg nachzuvollziehen, nicht nur während der Testphase.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity",
      "sourceTitle": "Review agent activity - Microsoft Copilot Studio"
    },
    {
      "id": "d3-011",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Rationale-Funktion",
      "content": "Die 'Rationale'-Funktion liefert eine Erklärung dafür, wie ein Agent entschieden hat, ein bestimmtes Tool aufzurufen oder Parameter zu befüllen. Sie existiert, weil es beim Überprüfen der Agentenaktivität nicht immer offensichtlich ist, warum der Agent gerade diese Aktion gewählt hat, was das Debuggen erschwert. Die Rationale wird von einer KI auf Anfrage generiert und basiert dabei auf Agentenmetadaten und der jeweiligen Aktivität; angezeigt wird sie über die Schaltfläche 'Show rationale' und nur für Wissensquellen oder Connectors mit dem Status 'Completed'. Beim Überprüfen der Agentenaktivität hilft diese Erklärung dabei, besser zu verstehen, warum der Agent ein bestimmtes Tool aufgerufen oder Parameter befüllt hat, und unterstützt so die Fehlersuche im Agentenverhalten. Da die Erklärung jedoch KI-generiert ist, kann sie ungenau sein, weshalb man sie stets mit eigenem Urteilsvermögen bewerten sollte, statt sie unhinterfragt zu übernehmen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity",
      "sourceTitle": "Review agent activity - Microsoft Copilot Studio"
    },
    {
      "id": "d3-012",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Agentenstatuswerte während der Ausführung",
      "content": "Während ein Agent eine Aktivität bearbeitet, durchläuft er verschiedene definierte Zustände, die dokumentieren, in welcher Phase der Ausführung er sich gerade befindet. Diese Statuswerte existieren, damit man beim Überprüfen der Agentenaktivität auf einen Blick erkennen kann, was gerade passiert oder passiert ist: 'Submitted' bedeutet, dass die Sitzung gerade gestartet wurde, 'In progress' zeigt an, dass mindestens einer der definierten Schritte noch nicht abgeschlossen ist, während 'Input required' beziehungsweise 'Auth required' signalisieren, dass der Agent auf eine Eingabe beziehungsweise Authentifizierung durch den Nutzer wartet. 'Complete' bedeutet, dass keine Fehler aufgetreten sind, die letzte Nachricht kein 'Manage Connections'-Dialog ist und der vom Konversationsstarter definierte Plan an Schritten abgeschlossen wurde, wobei eine Konversation durchaus mehrfach in und aus diesem Zustand wechseln kann. Weitere Zustände sind 'Canceled', bei dem verbleibende dynamische Pläne abgebrochen und der Dialog-Stack geleert wird, 'Failed' bei einem oder mehreren aufgetretenen Fehlern, sowie 'Rejected', wenn der Agent die Konversation ablehnt und gar nicht erst startet. Für AB-620 sind diese Statuswerte wichtig, um beim Prüfen von Aktivitäten sofort einordnen zu können, ob ein Ablauf erfolgreich war oder wo genau ein Problem lag.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity",
      "sourceTitle": "Review agent activity - Microsoft Copilot Studio"
    },
    {
      "id": "d3-013",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Evaluationsmethode: General quality",
      "content": "'General quality' ist eine von mehreren Testmethoden, die man beim Erstellen von Testsets für die Evaluation eines Agenten auswählen kann, und sie hilft dabei zu entscheiden, ob die Antworten des Agenten den eigenen Qualitätsansprüchen genügen. Sie nutzt dafür ein großes Sprachmodell (LLM), das die Antwortqualität anhand von vier Kriterien bewertet: Relevance prüft, ob die Antwort beim Thema bleibt und die Frage direkt beantwortet; Groundedness prüft, ob sich die Antwort auf den bereitgestellten Kontext stützt statt unbelegte Informationen einzubringen; Completeness prüft, ob alle Aspekte der Frage abgedeckt und ausreichend Details geliefert werden; und Abstention erfasst, ob der Agent überhaupt versucht hat, die Frage zu beantworten. Damit eine Antwort als hochwertig gilt, müssen alle diese Kriterien erfüllt sein; wird auch nur eines nicht erfüllt, wird die Antwort für eine Verbesserung markiert. Diese Methode ist besonders hilfreich, wenn es keine exakt erwartete Antwort gibt, weil sie flexibel anhand der abgerufenen Dokumente und des Konversationsverlaufs bewertet, weshalb für sie auch keine erwarteten Antworten in den Testfällen hinterlegt werden müssen. Im AB-620-Kontext ist 'General quality' die Standardmethode, die jedes neu erstellte Testset automatisch enthält.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
      "sourceTitle": "Choose evaluation methods - Microsoft Copilot Studio"
    },
    {
      "id": "d3-014",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Relevance- und Groundedness-Kriterien im Detail",
      "content": "Die Testmethode 'General quality' in Copilot Studio nutzt ein großes Sprachmodell (LLM), um die Qualität der Antworten eines Agenten anhand mehrerer Kriterien zu bewerten, darunter Relevance und Groundedness. Relevance misst, in welchem Ausmaß die Antwort des Agenten die gestellte Frage tatsächlich adressiert und beim Thema bleibt, statt abzuschweifen. Groundedness misst, in welchem Ausmaß die Antwort auf dem bereitgestellten Kontext (z.B. abgerufenen Wissensquellen) basiert, statt unabhängige oder unbelegte Informationen einzuführen. Diese Kriterien existieren, weil bei generativen Antworten ohne exakt erwartete Antwort schwer beurteilt werden kann, ob eine Antwort gut ist – General quality bietet dafür einen flexiblen, skalierbaren Bewertungsansatz. Damit eine Antwort insgesamt als hochwertig gilt, müssen alle Kriterien (auch Completeness und Abstention) gleichzeitig erfüllt sein; fehlt eines, wird die Antwort zur Verbesserung markiert. Im AB-620-Kontext ist dies zentral, um die Zuverlässigkeit von KI-generierten Antworten eines Copilot-Studio-Agenten objektiv und wiederholbar zu prüfen, bevor er produktiv geschaltet wird.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
      "sourceTitle": "Choose evaluation methods - Microsoft Copilot Studio"
    },
    {
      "id": "d3-015",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Weitere Testmethoden (Compare meaning, Tool use, Keyword match etc.)",
      "content": "Copilot Studio bietet neben 'General quality' mehrere spezialisierte Testmethoden, mit denen Testsets die Antwortqualität eines Agenten aus unterschiedlichen Blickwinkeln prüfen können. 'Compare meaning' vergleicht die Bedeutung der Antwort mit einer erwarteten Antwort anhand von Intent-Ähnlichkeit statt exaktem Wortlaut, mit einem Standard-Passwert von 50 – nützlich, wenn eine Antwort korrekt unterschiedlich formuliert sein kann. 'Tool use' prüft, ob der Agent die erwarteten Tools oder Topics zur Beantwortung verwendet hat (bestanden/nicht bestanden). 'Keyword match' prüft, ob bestimmte Schlüsselwörter oder Phrasen enthalten sind, wahlweise im Modus 'Any' (mindestens ein Treffer genügt) oder 'All' (alle müssen vorkommen). 'Text similarity' und 'Exact match' vergleichen den Wortlaut der Antwort mit einer erwarteten Antwort, während 'Custom' frei definierbare Kriterien mit eigenen Labels wie 'Compliant'/'Non-Compliant' erlaubt, etwa für Compliance-Prüfungen. Jedem Testset können mehrere dieser Methoden gleichzeitig hinzugefügt werden, sodass ein Agent aus verschiedenen Perspektiven gleichzeitig bewertet wird – wichtig, um sowohl inhaltliche Richtigkeit als auch technisches Verhalten (Tool-Nutzung) abzudecken.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview",
      "sourceTitle": "Choose evaluation methods - Microsoft Copilot Studio"
    },
    {
      "id": "d3-016",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Single-Response-Testset (Erstellung)",
      "content": "Eine Single-Response-Evaluierung testet den Agenten anhand einzelner, unverbundener Fragen statt einer zusammenhängenden Konversation – zum Beispiel wird zunächst nach den Geschäftszeiten gefragt, die Antwort erfasst, und dann unabhängig davon eine neue Frage zur Bestellhistorie gestellt. Dieser Ansatz eignet sich besonders, wenn geprüft werden soll, wie der Agent auf spezifische Fragen antwortet, welche Fähigkeiten er dabei aufruft und mit welchem exakten Wortlaut er antwortet. Ein Testset für Single-Response-Evaluierungen besteht aus bis zu 100 Testfällen, die manuell erstellt, per Spreadsheet (CSV/TXT) importiert oder per KI generiert werden können: Ein 'Quick question set' erzeugt automatisch 10 Fragen basierend auf Beschreibung, Anweisungen und Fähigkeiten des Agenten, während ein 'Full question set' Fragen aus Wissensquellen oder Topics generiert, wobei die Anzahl wählbar ist. Zusätzlich kann ein Testset direkt aus der letzten Testchat-Konversation befüllt werden. Im AB-620-Kontext ist dies die Standardmethode, um gezielt einzelne Fähigkeiten eines Agenten strukturiert und wiederholbar zu prüfen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
      "sourceTitle": "Create a single response test set - Microsoft Copilot Studio"
    },
    {
      "id": "d3-017",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Testsets aus Themes (Produktionsdaten) erstellen",
      "content": "Copilot Studio erlaubt es, Testsets auch aus 'Themes' zu erstellen – Gruppierungen von echten Benutzerfragen aus der Analytics-Funktion des Agenten, die generative Antworten ausgelöst haben. Diese Themen entstehen aus dem tatsächlichen Nutzerverhalten in Produktionskonversationen, sodass Testfälle auf realen, nicht künstlichen Fragen basieren. Der Vorteil liegt darin, dass sich damit die Antwortqualität gezielt für einen bestimmten Bereich, etwa Rechnungs- und Zahlungsfragen bei einem Kundenservice-Agenten, getrennt von anderen Anwendungsfällen wie Troubleshooting verfolgen lässt. Um ein Testset aus einem Theme zu erstellen, wird auf der Analytics-Seite des Agenten in der Themes-Liste bei einem Thema die Option 'Evaluate' ausgewählt und anschließend 'Create and open' bestätigt; danach können die generierten Testfälle bearbeitet werden. Voraussetzung ist Zugriff auf die Themes-Funktion in Analytics. Im AB-620-Kontext ist dies wichtig, um Evaluierungen praxisnah an tatsächlichen Nutzeranfragen statt an rein hypothetischen Fragen auszurichten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
      "sourceTitle": "Create a single response test set - Microsoft Copilot Studio"
    },
    {
      "id": "d3-018",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Aufbewahrungsdauer von Testergebnissen",
      "content": "Testergebnisse von Agent-Evaluierungen sind in Copilot Studio standardmäßig 89 Tage lang verfügbar und einsehbar. Diese Begrenzung existiert, damit Makerinnen und Maker wissen, dass Ergebnisse nicht dauerhaft in der Plattform gespeichert bleiben und rechtzeitig für eine langfristige Analyse gesichert werden müssen. Wer Testergebnisse über diesen Zeitraum hinaus aufbewahren möchte, muss sie aktiv als CSV-Datei exportieren, bevor die 89 Tage verstreichen. Dies ist besonders relevant für Nachverfolgung über längere Entwicklungszyklen hinweg, etwa um die Entwicklung der Agentenqualität über mehrere Monate zu dokumentieren oder Testergebnisse für Audits oder Compliance-Nachweise zu archivieren. Im AB-620-Kontext ist dieser Hinweis praxisrelevant, da Teams, die regelmäßig Regressionstests durchführen, einen Exportprozess etablieren sollten, um historische Vergleichsdaten nicht zu verlieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
      "sourceTitle": "Create a single response test set - Microsoft Copilot Studio"
    },
    {
      "id": "d3-019",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Import von Testfällen per CSV/TXT",
      "content": "Testfälle für ein Single-Response-Testset lassen sich in Copilot Studio auch per Datei-Import erstellen, statt sie manuell einzugeben oder per KI generieren zu lassen. Die Importdatei muss im CSV- oder TXT-Format vorliegen und darf bis zu 100 Fragen enthalten, wobei jede Frage inklusive Leerzeichen maximal 1000 Zeichen umfassen darf. In der ersten Zeile der Datei müssen die Spaltenüberschriften 'Question' und 'Expected response' in dieser Reihenfolge stehen; die erwarteten Antworten sind zwar optional für den reinen Import, werden aber zwingend benötigt, um Testmethoden wie Exact Match, Text Similarity oder Compare Meaning auszuführen. Praktisch lässt sich die Datei in einer Tabellenkalkulation wie Excel vorbereiten, wobei Copilot Studio dafür auch eine CSV-Vorlage zum Download anbietet. Dieser Importweg ist im AB-620-Kontext relevant, weil er es erlaubt, größere, bereits bestehende Fragenkataloge (z.B. aus FAQ-Listen) effizient und ohne manuelle Einzeleingabe in ein Testset zu überführen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create",
      "sourceTitle": "Create a single response test set - Microsoft Copilot Studio"
    },
    {
      "id": "d3-020",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Warum automatisiertes Testen (Agent Evaluation)?",
      "content": "Da KI-Agenten zunehmend kritische Rollen in Geschäftsprozessen übernehmen, wird zuverlässiges und wiederholbares Testen unverzichtbar – genau hier setzt Agent Evaluation in Copilot Studio an. Es ermöglicht automatisiertes, strukturiertes Testen, das Tests generiert, die reale Szenarien simulieren, und dabei mehr Fragen und Konversationen schneller abdeckt als manuelles, fallweises Testen über den Testchat. Dadurch werden Probleme früh erkannt, das Risiko schlechter Antworten reduziert und die Qualität über die Weiterentwicklung des Agenten hinweg gesichert, was Transparenz über die tatsächliche Performance schafft. Wichtig ist jedoch die Abgrenzung: Agent Evaluation misst Korrektheit und Performance, nicht jedoch KI-Ethik oder Sicherheitsprobleme – ein Agent kann alle Evaluierungstests bestehen und dennoch eine unangemessene Antwort liefern. Deshalb ersetzen Evaluierungen keine verantwortungsvollen KI-Prüfungen und Content-Safety-Filter, sondern ergänzen diese. Im AB-620-Kontext bedeutet dies, dass Evaluation ein Baustein neben, nicht anstelle von Responsible-AI-Maßnahmen ist.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro",
      "sourceTitle": "About agent evaluation - Microsoft Copilot Studio"
    },
    {
      "id": "d3-021",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Testfall und Testset (Definition)",
      "content": "Copilot Studio verwendet für jede Agent-Evaluierung einen 'Testfall' (test case) als Grundeinheit: Das ist eine einzelne simulierte Interaktion, die nachbildet, wie ein Nutzer mit dem Agenten interagieren würde – dies kann eine einzelne Frage oder eine ganze Konversation sein. Ein Testfall kann optional die Antwort enthalten, die man vom Agenten erwartet, zum Beispiel die Frage 'Wie sind Ihre Geschäftszeiten?' zusammen mit der erwarteten Antwort 'Wir haben von 9 bis 17 Uhr, Montag bis Freitag, geöffnet'. Eine Gruppe von Testfällen wird als 'Testset' (test set) bezeichnet und ermöglicht es, mehrere Fähigkeiten gleichzeitig statt einzeln nacheinander zu prüfen, das Ergebnis als aggregierten Score sowie im Detail pro Testfall zu analysieren, und – besonders wichtig – denselben Testset erneut auf veränderte Agentenversionen anzuwenden, um Performance-Veränderungen objektiv zu vergleichen. Im AB-620-Kontext bilden Testfall und Testset damit die begriffliche Grundlage, auf der sämtliche Testmethoden und Evaluierungsarten aufbauen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro",
      "sourceTitle": "About agent evaluation - Microsoft Copilot Studio"
    },
    {
      "id": "d3-022",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Regressionstests / Integration in CI/CD",
      "content": "Agent Evaluation in Copilot Studio unterstützt Automatisierung, sodass Makerinnen und Maker Evaluierungen nicht nur über die Benutzeroberfläche, sondern auch über Power-Platform-REST-APIs oder durch das Hinzufügen von Aktionen in Tools, Flows bzw. Power Automate auslösen können. Dadurch lassen sich Testläufe programmatisch starten und in automatisierte Workflows wie CI/CD-Pipelines (Continuous Integration/Continuous Deployment) integrieren, ohne dass ein manueller Eingriff in Copilot Studio notwendig ist. Dies erlaubt es, Testsets in großem Umfang auszuführen und das Verhalten eines Agenten bei jeder Änderung automatisch zu validieren. Genau das ist die Grundlage für Regressionstests: Dasselbe Testset wird wiederholt gegen denselben oder einen aktualisierten Agenten ausgeführt, um objektiv zu messen, ob sich die Performance verbessert, verschlechtert oder gleich bleibt. Im AB-620-Kontext ist dies zentral, um Agentenqualität in professionellen Entwicklungsprozessen mit wiederholbaren, automatisierten Prüfungen abzusichern statt sich auf punktuelles manuelles Testen zu verlassen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro",
      "sourceTitle": "About agent evaluation - Microsoft Copilot Studio"
    },
    {
      "id": "d3-023",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Testchat vs. Agent Evaluation",
      "content": "Copilot Studio bietet zwei unterschiedliche Testansätze, die sich in ihren Stärken ergänzen. Der Testchat empfängt und beantwortet jeweils eine Frage nach der anderen, erlaubt es aber, eine vollständige Sitzung mit mehreren Nachrichten wie ein echter Nutzer über eine Chat-Oberfläche zu testen; er ist jedoch schwer exakt wiederholbar, da jede Testsitzung manuell durchgeführt wird. Agent Evaluation dagegen kann über ein Testset mehrere Testfälle gleichzeitig erstellen und ausführen und Tests mit demselben Testset beliebig oft wiederholen, wobei jeder Testfall entweder eine einzelne Frage-Antwort-Interaktion oder eine ganze Konversation abbilden kann – allerdings mit weniger direkter Kontrolle über den Gesprächsverlauf als im Testchat. Zusätzlich lassen sich in Agent Evaluation verschiedene Benutzerprofile auswählen, um unterschiedliche Nutzer zu simulieren, ohne die Interaktionen selbst durchführen zu müssen. Microsoft empfiehlt daher ausdrücklich, für ein vollständiges Bild der Agentenqualität beide Methoden gemeinsam zu nutzen. Im AB-620-Kontext bedeutet das: Der Testchat eignet sich für explorative, manuelle Prüfungen, Agent Evaluation für skalierbare, wiederholbare Qualitätssicherung.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro",
      "sourceTitle": "About agent evaluation - Microsoft Copilot Studio"
    },
    {
      "id": "d3-024",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Konversationelles Testset (Multi-Turn Evaluation)",
      "content": "Die konversationelle Evaluierung in Copilot Studio bewertet das allgemeine Verhalten eines Agenten über eine längere Interaktion hinweg und spiegelt damit ab, wie reale Nutzerinnen und Nutzer tatsächlich mit Agenten interagieren, bei denen jede Antwort vom Kontext vorheriger Nachrichten in derselben Konversation abhängt. Damit lässt sich prüfen, ob der Agent Kontext über mehrere Nachrichten hinweg beibehalten, bei Unklarheiten gezielt nachfragen und mehrstufige Aufgaben erfolgreich abschließen kann – Fähigkeiten, die eine reine Single-Response-Prüfung nicht abdeckt. Ein Testset für konversationelle Evaluierungen unterstützt bis zu 20 Testfälle, wobei jeder Testfall bis zu 12 Nachrichten insgesamt umfassen darf, also bis zu 6 Frage-Antwort-Paare. Testfälle können hierbei per 'Quick conversation set' (10 automatisch generierte kurze Konversationen), 'Full conversation set' (Konversationen aus Wissensquellen/Topics, kurz oder lang wählbar) oder durch Umwandlung der letzten Testchat-Sitzung erstellt werden. Im AB-620-Kontext ergänzt dies die Single-Response-Testsets um die Prüfung mehrstufigen, kontextabhängigen Dialogverhaltens.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-multi-turn",
      "sourceTitle": "Create a conversational test set - Microsoft Copilot Studio"
    },
    {
      "id": "d3-025",
      "domainId": "d3",
      "subDomainId": "d3-sub-testing-evaluation",
      "topic": "Testmethoden bei konversationellen Testsets",
      "content": "Nicht jede in Copilot Studio verfügbare Testmethode kann auf jede Art von Testset angewendet werden – bei konversationellen Testsets ist die Auswahl bewusst eingeschränkt. Für konversationelle Testsets können nur 'General quality', 'Keyword match', 'Tool use' (in der Dokumentation auch als 'Tools use' bezeichnet) und 'Custom' als Testmethoden hinzugefügt werden. Nicht verfügbar sind dagegen 'Compare meaning', 'Text similarity' und 'Exact match', da diese Methoden ausschließlich für Single-Response-Testsets vorgesehen sind, weil sie eine einzelne, klar abgrenzbare erwartete Antwort auf eine einzelne Frage voraussetzen – ein Konzept, das bei einer mehrstufigen Konversation mit mehreren Antworten nicht sinnvoll eins-zu-eins funktioniert. Diese Einschränkung existiert also, weil die genannten Methoden auf dem direkten Textabgleich einer Antwort mit einer erwarteten Antwort beruhen. Im AB-620-Kontext ist es wichtig zu wissen, welche Testmethode zu welchem Testset-Typ passt, um beim Aufbau von Evaluierungsstrategien nicht versehentlich eine nicht unterstützte Kombination zu planen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-multi-turn",
      "sourceTitle": "Create a conversational test set - Microsoft Copilot Studio"
    },
    {
      "id": "d3-026",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Managed vs. Unmanaged Solutions (Definition)",
      "content": "Solutions sind der zentrale Mechanismus für Application Lifecycle Management (ALM) in Power Apps und Power Automate – und damit auch für Copilot-Studio-Agenten, die auf der Power Platform basieren – und existieren in genau zwei Typen: managed oder unmanaged. Unmanaged Solutions werden aktiv entwickelt: Sie kommen in Entwicklungsumgebungen zum Einsatz, während Änderungen an der Anwendung vorgenommen werden, und sollten als Quelle der Power-Platform-Assets gelten, deren exportierte unmanaged Version in ein Quellcode-Verwaltungssystem eingecheckt wird. Managed Solutions dagegen werden bereitgestellt (deployed) und in jede Umgebung importiert, die keine Entwicklungsumgebung dieser Solution ist – etwa Test-, UAT-, SIT- oder Produktionsumgebungen; sie lassen sich unabhängig von anderen managed Solutions warten, können aber nicht direkt bearbeitet werden (Komponenten müssen dazu erst in eine unmanaged Solution übernommen werden) und auch nicht selbst exportiert werden. Als ALM-Best-Practice gilt daher, dass eine Managed Solution durch den Export einer Unmanaged Solution als 'Managed' erzeugt und als Build-Artefakt betrachtet werden sollte, ähnlich einem kompilierten Programm aus Quellcode. Im AB-620-Kontext ist dieses Konzept die Grundlage dafür, wie Copilot-Studio-Agenten sauber von der Entwicklungs- in Test- und Produktionsumgebungen überführt werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm",
      "sourceTitle": "Solution concepts with Power Platform"
    },
    {
      "id": "d3-027",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Bearbeitungsbeschränkungen bei Managed Solutions",
      "content": "Eine Managed Solution ist eine für Zielumgebungen wie Test, UAT oder Produktion vorgesehene, quasi fertig gepackte Solution, die als Build-Artefakt aus einer Unmanaged Solution exportiert wird. Weil sie produktiv im Einsatz ist, dürfen ihre enthaltenen Komponenten nicht direkt bearbeitet werden – eine Anpassung ist nur möglich, indem die Komponente zuvor einer Unmanaged Solution hinzugefügt wird. Genau dadurch entsteht jedoch eine Abhängigkeit zwischen den eigenen Unmanaged-Anpassungen und der Managed Solution, die verhindert, dass die Managed Solution deinstalliert werden kann, solange diese Abhängigkeit nicht entfernt wurde. Zusätzlich kann eine Managed Solution selbst nicht exportiert werden; exportierbar ist immer nur eine Unmanaged Solution, die man wahlweise als unmanaged oder managed exportiert. Im AB-620/Copilot-Studio-ALM-Kontext ist dieses Prinzip zentral, um zu verstehen, warum man in Entwicklungsumgebungen stets mit Unmanaged Solutions arbeitet und Managed Solutions ausschließlich als kontrollierte Verteilungsartefakte in nachgelagerte Umgebungen importiert.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm",
      "sourceTitle": "Solution concepts with Power Platform"
    },
    {
      "id": "d3-028",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Löschen von Managed vs. Unmanaged Solutions",
      "content": "Managed und Unmanaged Solutions verhalten sich beim Löschen grundlegend unterschiedlich, was für ein sauberes ALM entscheidend ist. Wird eine Managed Solution gelöscht (deinstalliert), werden alle darin enthaltenen Customizations und Erweiterungen vollständig entfernt – zusätzlich gehen dabei auch Daten verloren, die in eigenen Tabellen oder eigenen Spalten der Managed Solution gespeichert waren. Wird dagegen eine Unmanaged Solution gelöscht, wird nur der Solution-Container selbst entfernt: Die enthaltenen Customizations bleiben weiterhin wirksam und werden automatisch der Default Solution zugeordnet. Dieser Unterschied existiert, weil Unmanaged Solutions lediglich als organisatorischer Container für Entwicklungsarbeit dienen, während Managed Solutions ein eigenständiges, in sich geschlossenes Verteilungspaket darstellen. Für AB-620/Copilot Studio bedeutet das: Man muss vor dem Deinstallieren einer Managed Solution in einer Zielumgebung genau wissen, welche Daten und Anpassungen betroffen sind, da dieser Schritt nicht rückgängig gemacht werden kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm",
      "sourceTitle": "Solution concepts with Power Platform"
    },
    {
      "id": "d3-029",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Unmanaged Layer beim Customizing",
      "content": "In Microsoft Dataverse existieren zwei grundlegend verschiedene Solution-Layer: die Unmanaged Layer und die Managed Layer(s). Wenn man in der Entwicklungsumgebung Anpassungen vornimmt, arbeitet man immer in der Unmanaged Layer – unabhängig davon, über welche Unmanaged Solution die Änderung erfolgt. Wichtig dabei ist: Alle importierten Unmanaged Solutions sowie sämtliche Ad-hoc-Customizations teilen sich eine einzige gemeinsame Unmanaged Layer, es gibt also nicht pro Solution eine eigene Unmanaged Layer. Dieses Prinzip existiert, weil Unmanaged Solutions als 'Entwicklungsquelle' gedacht sind und nicht als isolierte, unabhängig voneinander lauffähige Pakete. Für AB-620/Copilot Studio ist das relevant, weil es erklärt, warum Änderungen aus unterschiedlichen Unmanaged Solutions sich in derselben Entwicklungsumgebung gegenseitig beeinflussen können und warum beim Export als Managed Solution genau definiert werden muss, welche Komponenten mitgenommen werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/solution-layers-alm",
      "sourceTitle": "Solution layers and merge behavior in Power Platform"
    },
    {
      "id": "d3-030",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Power Platform Pipelines – Zweck",
      "content": "Power Platform Pipelines sind eine Funktion, die Application Lifecycle Management (ALM) für Power Platform- und Dynamics-365-Kunden zugänglicher machen soll. Sie existieren, weil klassisches ALM – also automatisiertes, kontrolliertes Verschieben von Solutions zwischen Umgebungen – bisher tiefes Fachwissen in CI/CD-Konzepten erforderte und dadurch für viele Maker, Admins und Entwickler eine hohe Einstiegshürde darstellte. Pipelines integrieren ALM-Automatisierung und CI/CD-Fähigkeiten direkt in den Dienst, sodass Admins automatisierte Deployment-Pipelines in Minuten statt Tagen oder Wochen konfigurieren können und Maker eine intuitive Oberfläche zum Deployen ihrer Solutions erhalten. Dadurch reduziert sich der Aufwand und das nötige Fachwissen erheblich, um von der ad-hoc-Anpassung zu einem gesunden, wiederholbaren ALM-Prozess zu gelangen. Im AB-620/Copilot-Studio-Kontext sind Pipelines damit das zentrale Werkzeug, um Solutions – etwa mit Copilot-Studio-Bots – strukturiert von der Entwicklungs- in Test- und Produktionsumgebungen zu bringen, ohne für jeden Schritt eigene DevOps-Pipelines aufsetzen zu müssen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/pipeline",
      "sourceTitle": "pac pipeline - Power Platform"
    },
    {
      "id": "d3-031",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Pipeline-Hosts: Platform Host vs. Custom Host",
      "content": "Beim Einrichten von Power Platform Pipelines gibt es zwei unterschiedliche Möglichkeiten, den 'Host' zu betreiben, also die Umgebung, in der Pipeline-Konfiguration und -Daten verwaltet werden. Der 'Platform host' ist der tenant-weite Standardhost, der bereits vorhanden ist und von Makern selbst konfiguriert werden kann; seine Daten zählen nicht gegen die Dataverse-Kapazität des Tenants, da sie in der Power-Platform-Infrastruktur gespeichert werden. Der 'Custom host' hingegen wird von Admins eingerichtet und läuft in einer eigenen, anpassbaren Umgebung – hier zählt die Datennutzung sehr wohl gegen die Kapazität, dafür können Admins damit citizen-led- und pro-dev-led-Projekte zentral steuern und beispielsweise gezielt einschränken, wer Pipelines erstellen darf. Diese Trennung existiert, damit sowohl kleine, selbstverwaltete Maker-Projekte als auch stark governte Unternehmensprojekte über dasselbe Pipeline-Feature abgebildet werden können. Für AB-620/Copilot Studio ist relevant, dass eine Umgebung immer nur einem Host zugeordnet sein kann und dass Admins bei Bedarf gezielt steuern können, in welchem Host welche Entwicklungsumgebungen betrieben werden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/set-up-pipelines",
      "sourceTitle": "Set up pipelines in Power Platform"
    },
    {
      "id": "d3-032",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Voraussetzungen zum Ausführen einer Pipeline",
      "content": "Damit eine Power Platform Pipeline überhaupt ausgeführt werden kann, müssen mehrere Voraussetzungen erfüllt sein. Zunächst muss bereits mindestens eine Pipeline erstellt und mit der Entwicklungsumgebung verknüpft worden sein, aus der heraus deployt werden soll. Die Entwicklungsumgebung selbst muss Microsoft Dataverse nutzen, wahlweise ergänzt um Dynamics-365-Customer-Engagement-Apps, da Pipelines auf Dataverse als Datengrundlage aufbauen. Der ausführende Benutzer benötigt außerdem explizite Zugriffsrechte, um die Pipeline auszuführen, sowie Importrechte für die Zielumgebungen, in die deployt werden soll – ohne diese Berechtigungen scheitert der Deployment-Versuch. Schließlich muss die Anwendung 'Power Platform Pipelines' in der Host-Umgebung der Pipeline installiert sein, da sie die eigentliche Logik für Konfiguration und Ausführung bereitstellt. Diese Voraussetzungen sind im AB-620-Kontext wichtig, weil sie zeigen, dass Pipelines kein reines UI-Feature sind, sondern auf klar definierte Rollen, Rechte und eine funktionierende Dataverse-Infrastruktur angewiesen sind.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/run-pipeline",
      "sourceTitle": "Run pipelines in Power Platform"
    },
    {
      "id": "d3-033",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Überwachung von Pipeline-Deployments",
      "content": "Damit Teams nachvollziehen können, ob ein automatisiertes Deployment erfolgreich war, bietet die Pipelines-Seite im Bereich 'Solutions' eine zentrale Übersicht: Dort werden alle Deployment-Aktivitäten für die aktuell ausgewählte Pipeline und Solution angezeigt. Wählt man eine Pipeline aus und öffnet anschließend 'Run history', erhält man detailliertere Informationen zu einzelnen Deployment-Läufen, einschließlich konkreter Fehlermeldungen, falls ein Lauf fehlgeschlagen ist. Diese Überwachungsmöglichkeit existiert, weil automatisierte Deployments – anders als manuelle Solution-Importe – ohne direkte Rückmeldung im Moment des Ausführens ablaufen und Teams daher eine verlässliche Historie brauchen, um Probleme nachträglich zu diagnostizieren. Im AB-620/Copilot-Studio-Umfeld ist dies besonders relevant für den produktiven Betrieb, da man bei einem fehlgeschlagenen Deployment schnell erkennen muss, ob z. B. fehlende Abhängigkeiten oder ungültige Verbindungsreferenzen die Ursache waren, bevor der nächste Deployment-Versuch gestartet wird.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/run-pipeline",
      "sourceTitle": "Run pipelines in Power Platform"
    },
    {
      "id": "d3-034",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "PAC-CLI-Befehle für Pipelines",
      "content": "Die Power Platform CLI (PAC CLI) bietet mit der Befehlsgruppe 'pac pipeline' eine Möglichkeit, Pipelines auch außerhalb der grafischen Oberfläche zu steuern, was für automatisierte Skripte und CI/CD-Integrationen wichtig ist. Der Befehl 'pac pipeline deploy' startet ein Pipeline-Deployment und benötigt dafür Angaben wie die aktuelle und die neue Solution-Version, den Solution-Namen sowie die Deployment-Stage-ID; optional lässt sich mit '--wait' darauf warten, dass das Deployment tatsächlich abgeschlossen ist. Der Befehl 'pac pipeline list' listet vorhandene Pipelines der verbundenen Umgebung auf und kann mit dem Parameter '--environment' bzw. '-env' auch auf eine andere Umgebung im selben Tenant angewendet werden, ohne dass man sich dafür manuell neu verbinden muss. Diese Befehle existieren, damit Pipeline-Aktionen, die sonst nur über die Maker-Oberfläche ausgelöst werden, in automatisierte Build- und Deployment-Skripte eingebettet werden können. Im AB-620-Kontext ist das die Brücke zwischen den im UI konfigurierten Pipelines und einer skriptbasierten, wiederholbaren DevOps-Praxis für Copilot-Studio-Lösungen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/pipeline",
      "sourceTitle": "pac pipeline - Power Platform"
    },
    {
      "id": "d3-035",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "PAC CLI – Installationsmöglichkeiten",
      "content": "Die Power Platform CLI (PAC CLI) ist das zentrale Kommandozeilenwerkzeug, mit dem Entwickler und ISVs Vorgänge wie Umgebungslebenszyklus, Authentifizierung, Dataverse-Umgebungen und Solution-Pakete steuern können. Sie kann auf drei Wegen installiert werden: über die Visual Studio Code-Erweiterung (funktioniert unter Windows, Linux und macOS, stellt Befehle aber standardmäßig nur in einem VS-Code-Terminal bereit, sofern man sie nicht zusätzlich für CMD/PowerShell aktiviert), über das .NET-Tool (funktioniert auf allen drei Betriebssystemen in PowerShell, CMD oder Bash, unterstützt aber bestimmte, nur unter Windows verfügbare Befehle wie 'pac data' nicht) oder über die Windows-MSI (nur unter Windows, dafür mit Versionsverwaltung). Diese Auswahl existiert, weil unterschiedliche Entwicklerumgebungen und Betriebssysteme unterschiedliche Anforderungen an Installation und Befehlsumfang stellen. Mit 'pac help' bzw. 'pac <subcommand> help' erhält man jederzeit die vollständige Liste der unterstützten Befehle, was im AB-620-Kontext hilft, sich in der CLI zurechtzufinden, ohne ständig die Online-Dokumentation nachschlagen zu müssen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction",
      "sourceTitle": "Install and Configure Microsoft Power Platform CLI"
    },
    {
      "id": "d3-036",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "PAC CLI Versionsverwaltung",
      "content": "Wer die Power Platform CLI über die Windows-MSI installiert, kann mehrere Versionen parallel auf demselben Rechner behalten, da alte Installationen bei einem Update nicht automatisch entfernt werden. Mit dem Befehl 'pac install latest' lädt man die neueste verfügbare Version der CLI herunter und installiert sie, ohne vorhandene ältere Versionen zu löschen. Der Befehl 'pac use' ohne Parameter zeigt alle installierten Versionen sowie die aktuell verwendete Version an; mit 'pac use <version>' wechselt man gezielt zu einer bestimmten installierten Version. Diese Versionsverwaltung existiert, damit man bei Problemen mit einer neueren CLI-Version schnell auf eine bekannte, funktionierende ältere Version zurückwechseln kann, ohne die CLI komplett neu installieren zu müssen. Im AB-620-Kontext ist das relevant, wenn unterschiedliche Projekte oder Skripte auf eine bestimmte, getestete CLI-Version angewiesen sind und Kompatibilität sichergestellt werden muss.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/developer/howto/install-cli-msi",
      "sourceTitle": "Install Power Platform CLI using Windows MSI"
    },
    {
      "id": "d3-037",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "pac solution Befehlsgruppe",
      "content": "Die Befehlsgruppe 'pac solution' der Power Platform CLI bündelt alle Befehle, um mit Dataverse-Solution-Projekten zu arbeiten, und ist damit das zentrale Werkzeug für skriptbasiertes Solution-Management. Dazu gehören unter anderem 'pac solution export' zum Export einer Solution aus Dataverse als Zip-Datei (vergleichbar mit dem Export über das Maker-Portal), 'pac solution import' zum Importieren einer Solution in Dataverse sowie 'pac solution pack' und 'pac solution unpack', die mithilfe des SolutionPackager die einzelnen Solution-Komponenten in eine solution.zip packen bzw. daraus wieder in einzelne Dateien auf dem lokalen Dateisystem extrahieren. Zusätzlich erstellt 'pac solution clone' ein Solution-Projekt auf Basis einer bestehenden Organisations-Solution, inklusive einer .cdsproj-Projektdatei, die spätere Referenzen und Builds mit dotnet build oder msbuild ermöglicht. Diese Befehlsgruppe existiert, weil professionelle ALM-Prozesse verlangen, dass Solutions als Textdateien in Versionskontrolle abgelegt, im Team bearbeitet und automatisiert gebaut werden können, statt nur als Binärdatei im Maker-Portal zu existieren. Im AB-620-Kontext bildet 'pac solution' damit die Brücke zwischen der grafischen Solution-Verwaltung und einem source-control-basierten Entwicklungsworkflow für Copilot-Studio-Lösungen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/solution",
      "sourceTitle": "Microsoft Power Platform CLI solution command group - Power Platform"
    },
    {
      "id": "d3-038",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "pac solution create-settings für Deployment-Einstellungen",
      "content": "Der Befehl 'pac solution create-settings --solution-zip <pfad> --settings-file <name>' erzeugt aus einer Solution-Zip-Datei (oder alternativ aus einem geklonten Solution-Ordner) eine Deployment-Settings-Datei im JSON-Format. Diese Datei listet automatisch alle in der Solution enthaltenen Umgebungsvariablen und Connection References mit ihren Schema- bzw. Logical-Namen auf, lässt die konkreten Werte wie Connection-ID oder Variablenwert aber zunächst leer, da diese vom Zielsystem abhängen. Diese Vorgehensweise existiert, weil beim manuellen Import einer Solution normalerweise interaktiv im UI nach diesen Werten gefragt wird – was für vollautomatisierte CI/CD-Deployments ungeeignet ist. Nachdem man die Datei generiert hat, trägt man die fehlenden Werte für die jeweilige Zielumgebung (z. B. Test oder Produktion) manuell ein und kann die Datei anschließend versioniert in der Quellcodeverwaltung ablegen. Im AB-620/Copilot-Studio-Kontext ist 'pac solution create-settings' damit der erste Schritt, um Connection References und Umgebungsvariablen für automatisierte Deployments vorzubereiten.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/conn-ref-env-variables-build-tools",
      "sourceTitle": "Pre-populate connection references and environment variables for automated deployments"
    },
    {
      "id": "d3-039",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Zweck der Deployment-Settings-Datei",
      "content": "Connection References und Umgebungsvariablen ermöglichen es, Verbindungsdetails und Konfigurationseinstellungen spezifisch für die jeweilige Zielumgebung zu hinterlegen, in die eine App oder Solution deployt wird. Normalerweise wird man nach dem Import einer Solution im UI interaktiv aufgefordert, diese umgebungsspezifischen Werte einzutragen – ein Vorgang, der für vollautomatisierte CI/CD-Szenarien nicht praktikabel ist. Genau hier setzt die Deployment-Settings-Datei (JSON) an: Sie speichert Connection References und Umgebungsvariablenwerte vorab, sodass sie beim automatisierten Import über Power Platform Build Tools direkt als Parameter mitgegeben werden können, ohne dass jemand manuell im UI eingreifen muss. Die Datei kann außerdem in der Quellcodeverwaltung abgelegt und für die jeweilige Organisation gepflegt und aktualisiert werden. Im AB-620/Copilot-Studio-Kontext ist die Deployment-Settings-Datei damit ein zentraler Baustein, um Solutions zuverlässig und ohne manuelle Zwischenschritte von einer Entwicklungs- in eine Test- oder Produktionsumgebung zu bringen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-platform/alm/conn-ref-env-variables-build-tools",
      "sourceTitle": "Pre-populate connection references and environment variables for automated deployments"
    },
    {
      "id": "d3-040",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Connection References – Zweck",
      "content": "Eine Connection Reference ist eine Solution-Komponente, die eine Verbindung (Connection) zu einem bestimmten Connector referenziert, statt dass eine Canvas App oder ein solution-fähiger Flow direkt an eine Connection gebunden ist. Der Grund für dieses Zwischenglied liegt in der Anwendungslebenszyklusverwaltung (ALM): Verbindungen mit ihren Zugangsdaten sind pro Umgebung unterschiedlich (z.B. Dev, Test, Produktion), während die Solution als Ganzes umgebungsübergreifend gleich bleiben soll. Connection References werden Solutions auf drei Wegen hinzugefügt: manuell über den Solution Explorer, automatisch beim Import einer Solution, oder implizit beim Erstellen von Canvas Apps und Flows innerhalb einer Dataverse-Solution. Beim Import einer Solution in eine Zielumgebung wird für jede Connection Reference eine passende Connection bereitgestellt, sodass referenzierende Flows automatisch aktiviert werden können. Um die konkrete Verbindung einer App oder eines Flows zu ändern, bearbeitet man einfach die Connection-Reference-Komponente in der Solution, ohne die App oder den Flow selbst anfassen zu müssen. Im Copilot-Studio/AB-620-Kontext ist dies zentral für sauberes ALM, weil Agenten und ihre zugehörigen Power-Automate-Flows so ohne Codeänderungen zwischen Umgebungen wandern können.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-connection-reference",
      "sourceTitle": "Use a connection reference in a solution with Microsoft Dataverse"
    },
    {
      "id": "d3-041",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Bekannte Einschränkung: Custom Connectors und Connection References",
      "content": "Canvas Apps und Flows behandeln Verbindungen unterschiedlich: Flows nutzen Connection References für alle Connectoren, während Canvas Apps sie nur für implizit geteilte (nicht-OAuth) Verbindungen verwenden, etwa SQL-Server-Authentifizierung. Diese Besonderheit führt zu einer bekannten Einschränkung bei Custom Connectors, also selbst erstellten Connectoren für eigene APIs: Canvas Apps erkennen Connection References für Custom Connectors nicht zuverlässig. In der Praxis bedeutet das, dass man nach dem Import einer Solution die betroffene App öffnen und die Custom-Connector-Verbindung manuell entfernen und neu hinzufügen muss, damit die App wieder funktioniert. Zusätzlich verlangt ALM hier eine bestimmte Reihenfolge: Custom Connectors müssen vor den zugehörigen Connection References und Flows importiert werden, idealerweise in einer eigenen, separaten Solution. Wer diese Reihenfolge missachtet, riskiert fehlerhafte oder inaktive Verbindungen nach dem Deployment. Für AB-620-Szenarien mit individuellen APIs (z.B. angebundenen Backend-Systemen für einen Copilot-Studio-Agenten) ist dieses Wissen wichtig, um Importfehler und manuellen Nacharbeitsaufwand von vornherein einzuplanen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-connection-reference",
      "sourceTitle": "Use a connection reference in a solution with Microsoft Dataverse"
    },
    {
      "id": "d3-042",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Umgebungsvariablen – Datentypen",
      "content": "Umgebungsvariablen sind Solution-Komponenten, die es erlauben, externe Anwendungsreferenzen wie Tabellen, Verbindungen oder Schlüssel getrennt von der eigentlichen App-Logik zu speichern, damit sich diese Werte beim Verschieben einer Solution zwischen Umgebungen ändern lassen, ohne die App selbst anzupassen. Beim manuellen Anlegen einer Umgebungsvariable in einer Solution wählt man zunächst einen Anzeigenamen und dann einen Datentyp: Decimal number, Text, JSON, Two options, Data source oder Secret. Wählt man 'Data source', müssen zusätzlich der Connector, eine gültige Connection für diesen Connector sowie der konkrete Parametertyp angegeben werden – die Connection wird dabei nur genutzt, um verfügbare Parameterwerte abzurufen (z.B. zugängliche SharePoint-Websites oder Listen). Beim Typ 'Secret' sind zusätzlich Konfigurationsschritte in Azure Key Vault nötig, damit Power Platform auf das Geheimnis zugreifen kann. Neben dem Datentyp besitzt jede Umgebungsvariable einen optionalen Current Value (wird beim Solution-Export separat als JSON-Datei mitgeliefert und lässt sich offline bearbeiten) und einen Default Value, der nur greift, wenn kein Current Value gesetzt ist. Diese Trennung erlaubt es z.B., dass ein Solution-Anbieter einen Standardwert vorgibt, während ein Kunde einen eigenen Wert setzt, der bei Updates nicht überschrieben wird. Im AB-620-Kontext sind Umgebungsvariablen damit ein zentrales Werkzeug, um Copilot-Studio-Agenten und zugehörige Flows CI/CD-tauglich über mehrere Umgebungen zu transportieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables",
      "sourceTitle": "Use environment variables in Power Platform solutions"
    },
    {
      "id": "d3-043",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Umgebungsvariablen vom Typ Data Source",
      "content": "Eine Umgebungsvariable vom Datentyp 'Data source' unterscheidet sich von anderen Typen dadurch, dass sie ausdrücklich keine Verbindung selbst speichert. Stattdessen hält sie genau die Informationen fest, die nicht bereits Teil der Connection sind, aber notwendig sind, damit Power Apps sich mit dem richtigen Server bzw. der richtigen Tabelle verbindet – etwa Site- und Listenparameter bei SharePoint Online. Der Grund für dieses Design ist, dass Verbindungen (mit ihren Zugangsdaten) umgebungsspezifisch und oft benutzergebunden sind, während die strukturellen Zielangaben (welcher Server, welche Tabelle) eigenständig konfiguriert und beim Wechsel der Umgebung ausgetauscht werden müssen. Die bei der Definition ausgewählte Connection dient also nur als Hilfsmittel, um im Erstellungsprozess verfügbare Parameterwerte abzurufen, etwa zugängliche SharePoint-Websites oder deren Listen, wird aber nicht persistent Teil der Variable. Dieses Prinzip erlaubt es, dieselbe App oder denselben Flow in unterschiedlichen Umgebungen mit jeweils unterschiedlichen Datenquellen laufen zu lassen, ohne die Anwendung selbst zu verändern. Für AB-620-Szenarien mit Copilot-Studio-Agenten, die auf externe Datenquellen zugreifen, ist dieses Verständnis wichtig, um Fehlkonfigurationen beim Verschieben zwischen Dev-, Test- und Produktionsumgebungen zu vermeiden.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables",
      "sourceTitle": "Use environment variables in Power Platform solutions"
    },
    {
      "id": "d3-044",
      "domainId": "d3",
      "subDomainId": "d3-sub-alm-deployment",
      "topic": "Umgebungsvariablen vs. Connection References bei SQL-Quellen",
      "content": "Bei der Anbindung von SQL-Server-Datenquellen zeigt sich besonders deutlich, wie Umgebungsvariablen und Connection References sich ergänzen, aber unterschiedliche Aufgaben übernehmen. Für Microsoft-Entra-basierte Verbindungen (also moderne, Azure-AD-gestützte Authentifizierung) werden Umgebungsvariablen eingesetzt, weil Tabellennamen fest an die Anwendung gebunden sind und als über Umgebungen hinweg identisch gelten – hier muss also nur die strukturelle Zielangabe (z.B. Server/Datenbank) variabel gehalten werden. Connection References kommen dagegen für Informationen zum Einsatz, die traditionell Teil eines klassischen Connection Strings sind, etwa Server- und Datenbankname bei einfacher SQL-Authentifizierung (Basic Auth) mit Benutzername und Passwort. Dieser Unterschied liegt daran, dass Canvas Apps Connection References nur für implizit geteilte, nicht-OAuth-Verbindungen wie SQL-Server-Authentifizierung nutzen, während bei Entra-Verbindungen der Fokus auf der austauschbaren Zielangabe liegt. Für AB-620-Praktiker bedeutet das: Je nach gewähltem Authentifizierungsmodell für die SQL-Anbindung eines Agenten muss man das passende ALM-Werkzeug (Umgebungsvariable oder Connection Reference) wählen, um eine Solution korrekt zwischen Umgebungen zu transportieren.",
      "sourceUrl": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables",
      "sourceTitle": "Use environment variables in Power Platform solutions"
    },
    {
      "id": "d3-045",
      "domainId": "d3",
      "subDomainId": "d3-sub-monitoring-analytics",
      "topic": "Application Insights – Telemetrieanbindung für Agenten",
      "content": "Application Insights ist ein Azure-Dienst zur Anwendungsleistungsüberwachung (Application Performance Monitoring), der Copilot-Studio-Agenten mit einer eigenen Telemetrieebene ausstattet, zusätzlich zu den nativen Analytics-Funktionen von Copilot Studio. Um einen Agenten anzubinden, trägt man auf der Einstellungsseite unter 'Advanced' im Bereich 'Application Insights' den Connection String ein; optional lassen sich Logging-Details aktivieren, etwa das Protokollieren von Nachrichteninhalten, sensiblen Activity-Eigenschaften oder Node-Ausführungsereignissen pro Topic. Diese Funktion existiert, weil Standard-Analytics zwar aggregierte Kennzahlen liefern, aber für tiefgehende, individuell abfragbare Diagnosedaten (z.B. eigene Kusto-Abfragen über exakte Ereignisfolgen) ein vollwertiges Log-Analytics-Backend nötig ist. Sobald die Verbindung besteht, protokolliert der Agent Telemetriedaten bei jeder Benutzerinteraktion – ausdrücklich auch beim Testen im Testpanel von Copilot Studio, was sich über die Custom Dimension 'designMode' gezielt herausfiltern lässt. Die erfassten Daten lassen sich im Bereich 'Logs' der Application-Insights-Ressource mit der Abfragesprache Kusto (KQL) analysieren, etwa um aktive Nutzer pro Tag zu zählen. Im AB-620-Kontext ist diese Anbindung relevant für Betriebsteams, die über die Standard-Analytics hinaus detaillierte, individuell zugeschnittene Auswertungen für ihre Agenten benötigen.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry",
      "sourceTitle": "Agent-level telemetry with Application Insights"
    },
    {
      "id": "d3-046",
      "domainId": "d3",
      "subDomainId": "d3-sub-monitoring-analytics",
      "topic": "Copilot Studio Dashboard in Application Insights",
      "content": "Das 'Copilot Studio Dashboard' ist ein vorgefertigtes Azure-Workbook, das über Azure Monitor Application Insights bereitgestellt wird und sich aktuell im Preview-Status befindet. Es existiert, um Teams eine zentrale, visuelle Übersicht zu geben, ohne dass sie eigene Kusto-Abfragen schreiben müssen: Das Dashboard fragt Signale über Azure Workbooks ab und fasst Kennzahlen wie Gesamtzahl der Konversationen, Latenz, Exceptions, Tool-Nutzung und Topic-Analytics in einer einzigen Ansicht zusammen. Der Zugriff erfolgt über die Application-Insights-Ressource: Dort wählt man im linken Navigationsbereich 'Monitoring' und darunter 'Workbooks', um das Dashboard aus der Workbook-Galerie zu öffnen. Da das Dashboard als editierbares Workbook angelegt ist, lässt es sich über 'Edit' anpassen – einzelne Kacheln können verändert, verschoben, geklont oder entfernt werden, und es lassen sich neue, eigene KQL-basierte Kacheln für zusätzliche Attribute hinzufügen. Der Zweck dieser Transparenz ist es, Teams eine gemeinsame Grundlage zu geben, um den operativen Zustand und die Qualität ihrer Agenten zu verfolgen, Trends zu erkennen und kontinuierlich Verbesserungen zu bewerten. Für AB-620 ist dieses Dashboard ein praktischer Einstiegspunkt, um ohne eigene KQL-Kenntnisse einen Überblick über Betrieb und Gesundheit eines Copilot-Studio-Agenten zu erhalten, sofern Application Insights bereits angebunden ist.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry",
      "sourceTitle": "Agent-level telemetry with Application Insights"
    },
    {
      "id": "d3-047",
      "domainId": "d3",
      "subDomainId": "d3-sub-monitoring-analytics",
      "topic": "Analytics-Seite in Copilot Studio – Übersicht",
      "content": "Die Analytics-Seite ist der native, in Copilot Studio integrierte Bereich, um zu verstehen, wie gut ein Agent funktioniert und wo Verbesserungspotenzial besteht – man erreicht sie, indem man den Agenten öffnet und im oberen Menü 'Analytics' auswählt. Sie liefert umfassende Daten von einer Übersicht der Schlüsselkennzahlen bis zu detaillierten Nutzungsanalysen der einzelnen Agentenkomponenten, wobei sich jede Kennzahl weiter aufschlüsseln lässt. Die Analytics-Erfahrung ist speziell auf zwei Agententypen zugeschnitten: konversationelle Agenten und autonome Agenten (mit Event-Trigger), die jeweils eigene Auswertungslogiken haben. Wichtig für die Interpretation der Daten sind die Verfügbarkeitsfenster: Analytics sind in allen Geografien verfügbar und Kennzahlen bleiben bis zu 360 Tage einsehbar, während Sitzungsdetails und Konversationstranskripte nur für die letzten 28 Tage abrufbar sind; alle Zeitstempel sind einheitlich in UTC angegeben, um Vergleichbarkeit sicherzustellen. Zusätzlich lässt sich über die Freigabe-Rolle 'Analytics Viewer' ein eingeschränkter, reiner Lesezugriff auf die Analytics-Seite an einzelne Personen vergeben, ohne ihnen volle Bearbeitungsrechte am Agenten zu geben. Für AB-620 ist diese Seite die zentrale erste Anlaufstelle, um Agentenleistung datenbasiert zu bewerten, bevor man für Detailanalysen zu externen Werkzeugen wie Application Insights wechselt.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-overview",
      "sourceTitle": "Analytics overview - Microsoft Copilot Studio"
    },
    {
      "id": "d3-048",
      "domainId": "d3",
      "subDomainId": "d3-sub-monitoring-analytics",
      "topic": "Analytics erfasst keine Testpanel-Aktivität",
      "content": "Eine wichtige Einschränkung der Analytics-Seite in Copilot Studio ist, dass sie keine Auswertungen für Aktivitäten zeigt, die man beim Testen des Agenten im integrierten Testpanel durchführt. Diese Trennung existiert, weil Analytics dazu gedacht ist, die tatsächliche Nutzung durch echte Endanwender über produktive Kanäle abzubilden, während Testinteraktionen im Testpanel reine Entwicklungs- und Qualitätssicherungsvorgänge sind, die die produktiven Kennzahlen sonst verfälschen würden. Wer also während der Entwicklung eines Agenten dessen Topics im Testpanel ausprobiert, wird diese Durchläufe nicht in den Analytics-Zahlen wiederfinden – sie zählen schlicht nicht als reale Konversationssitzungen. Anders verhält es sich bei der externen Application-Insights-Anbindung: Dort werden Testpanel-Interaktionen sehr wohl mitprotokolliert, lassen sich aber über die Custom Dimension 'designMode' gezielt aus Abfragen herausfiltern. Für AB-620-Teams ist dieses Detail wichtig, um Analytics-Kennzahlen korrekt zu interpretieren: Ein Agent, der intensiv getestet, aber noch nicht produktiv genutzt wurde, zeigt in Copilot Studio dementsprechend keine oder kaum Analytics-Daten, was kein Fehler, sondern das erwartete Verhalten ist.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-overview",
      "sourceTitle": "Analytics overview - Microsoft Copilot Studio"
    },
    {
      "id": "d3-049",
      "domainId": "d3",
      "subDomainId": "d3-sub-monitoring-analytics",
      "topic": "Topic-Nutzungsanalyse",
      "content": "Die Topic-Analytics-Funktion erlaubt es, die Leistung eines einzelnen Topics innerhalb eines Agenten gezielt zu untersuchen, statt nur aggregierte Gesamtkennzahlen zu betrachten. Man ruft sie auf, indem man auf der Topics-Seite des Agenten ein bestimmtes Topic auswählt und über das Menü 'More' (die drei Punkte) den Eintrag 'Analytics' wählt; existieren noch keine Topics, muss zunächst eines angelegt werden. Das eingeblendete Panel zeigt mehrere Kennzahlen: die Topic-Outcomes als Diagramm der Sitzungsergebnisse 'Escalated', 'Resolved' und 'Abandoned' für Sitzungen, in denen das Topic ausgelöst wurde, sowie die Gesamtnutzung des Topics als Trend über die Zeit, um etwa Regressionen nach einer Bearbeitung zu erkennen. Zusätzlich wird ein Zufriedenheitswert (Customer Satisfaction Score) auf Basis von Nutzerumfragen sowie dessen Verlauf über die Zeit angezeigt. Wichtig ist die Einschränkung, dass Topic-Analytics nur für Agenten im klassischen Modus ('classic mode') zur Verfügung steht; Agenten mit generativer Orchestrierung nutzen stattdessen Conversation Outcomes und Themes auf der allgemeinen Analytics-Seite. Für AB-620 ist diese granulare Sicht wertvoll, um gezielt einzelne, schlecht performende Gesprächsabschnitte (z.B. mit vielen abgebrochenen Sitzungen) zu identifizieren und iterativ zu verbessern.",
      "sourceUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-overview",
      "sourceTitle": "Analytics overview - Microsoft Copilot Studio"
    },
    {
      "id": "d3-050",
      "domainId": "d3",
      "subDomainId": "d3-sub-monitoring-analytics",
      "topic": "Voraussetzung für Application-Insights-Zugriff",
      "content": "Um Application Insights überhaupt mit einem Copilot-Studio-Bot verbinden zu können, muss zunächst eine grundlegende Voraussetzung erfüllt sein: Man benötigt Zugriff auf die zugehörige Application-Insights-Ressource im Azure-Portal, da diese getrennt von Copilot Studio als eigenständige Azure-Ressource verwaltet wird und eigene Berechtigungen erfordert. Erst mit diesem Zugriff lässt sich der für die Verbindung nötige Connection String bzw. Ressourcenname und Schlüssel ermitteln. Praktisch findet man diese Angaben aber nicht nur im Azure-Portal, sondern bequem auch direkt auf der Einstellungsseite des Agenten unter dem Bereich 'Analytics', was den Einrichtungsprozess vereinfacht, ohne zwischen zwei Portalen wechseln zu müssen. Der Grund für diese Voraussetzung liegt darin, dass Application Insights ein Azure-Dienst mit eigenem Kostenmodell und eigener Zugriffskontrolle ist, der unabhängig vom Copilot-Studio-Abonnement bereitgestellt und verwaltet werden muss. Ohne passenden Zugriff kann kein Connection String beschafft werden, und die Telemetrieanbindung des Agenten kann nicht konfiguriert werden. Für AB-620-Teams bedeutet das in der Praxis, dass die Einrichtung von Application-Insights-Telemetrie für einen Agenten eine Abstimmung mit denjenigen erfordert, die Azure-Ressourcen und deren Zugriffsrechte verwalten, bevor man mit der eigentlichen Konfiguration im Agenten beginnen kann.",
      "sourceUrl": "https://learn.microsoft.com/en-us/dynamics365/guidance/resources/copilot-studio-appinsights",
      "sourceTitle": "Application Insights telemetry with Microsoft Copilot Studio"
    }
  ],
  "labs": [
    {
      "id": "lab-01",
      "sequence": 1,
      "title": "Lab 1: Contoso Service Operations Agent abgrenzen",
      "topic": "Planung",
      "domainId": "d1",
      "objective": "Die Lösungsgrenze und Architektur des synthetischen Contoso Service Operations Agent festlegen und als Architecture Decision Record dokumentieren.",
      "prerequisites": ["Texteditor", "README und Lab-Guide des Repositorys gelesen"],
      "steps": ["Contoso-Szenario und Stakeholder erfassen.", "In-Scope- und Out-of-Scope-Funktionen festlegen.", "Kanäle, Identität, Daten und Integrationspunkte skizzieren.", "Architekturentscheidungen mit Alternativen und Begründungen dokumentieren.", "ADR auf offene Risiken und Annahmen prüfen."],
      "artifacts": ["Contoso architecture decision record (ADR)", "Solution boundary and assumptions"],
      "verification": "Das ADR nennt Zweck, Grenzen, Abhängigkeiten, Risiken und eine nachvollziehbare Entscheidung für den Agenten.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-01-scope-the-contoso-service-operations-agent.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-get-started"]
    },
    {
      "id": "lab-02",
      "sequence": 2,
      "title": "Lab 2: Identität, Kanal und Governance entwerfen",
      "topic": "Planung",
      "domainId": "d1",
      "objective": "Eine Identitäts- und Governance-Matrix für den Contoso-Agenten erstellen und mit prüfbaren Kontrollen an das ADR anhängen.",
      "prerequisites": ["Lab 1 ADR", "Power Platform- und Entra-ID-Übersicht"],
      "steps": ["Zielgruppen und Authentifizierungsbedarf je Kanal bestimmen.", "Zugriffs- und Datenklassifizierungsanforderungen erfassen.", "Governance-, DLP- und Responsible-AI-Kontrollen zuordnen.", "Owner, Nachweis und Ausnahmeprozess je Kontrolle ergänzen.", "Matrix reviewen und im ADR versioniert ablegen."],
      "artifacts": ["Identity and governance matrix", "Updated Contoso ADR"],
      "verification": "Jede Kontrolle hat Scope, Owner, Nachweis und eine klare Entscheidung für Entwicklung und Betrieb.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-02-design-identity-channel-and-governance-controls.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication", "https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention"]
    },
    {
      "id": "lab-03",
      "sequence": 3,
      "title": "Lab 3: Agent-Shell und Anweisungen erstellen",
      "topic": "Flows",
      "domainId": "d1",
      "objective": "Einen benannten Copilot-Studio-Agenten mit Beschreibung, Anweisungen und reproduzierbarem Gesprächs-Baseline anlegen.",
      "prerequisites": ["Lab 1 ADR", "Copilot-Studio-Umgebung"],
      "steps": ["Neuen Contoso Service Operations Agent anlegen.", "Name und Beschreibung aus dem ADR übernehmen.", "Rolle, Grenzen, Tonalität und Eskalationsregeln als Anweisungen erfassen.", "Ein Baseline-Szenario im Testfenster ausführen.", "Antworten und Konfiguration als Baseline-Record speichern."],
      "artifacts": ["Copilot Studio agent shell", "Saved baseline conversation record"],
      "verification": "Agentname, Beschreibung und Anweisungen sind gespeichert; das Baseline-Szenario ist reproduzierbar dokumentiert.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-03-create-the-agent-shell-and-instructions.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-get-started"]
    },
    {
      "id": "lab-04",
      "sequence": 4,
      "title": "Lab 4: Request-Intake-Flow mit Human Review bauen",
      "topic": "Flows",
      "domainId": "d1",
      "objective": "Einen Agent Flow für Service-Entwürfe mit Standard-, Review- und Invalid-Input-Pfaden implementieren.",
      "prerequisites": ["Lab 3 Agent-Shell", "Power Automate", "Teams oder freigegebener Review-Connector"],
      "steps": ["Flow Create Service Request Draft anlegen.", "Eingaben und Pflichtfelder definieren und validieren.", "Standardpfad für vollständige Anforderungen modellieren.", "Human-Review-Schritt und Statusübergänge ergänzen.", "Standard-, Review- und Invalid-Input-Testläufe ausführen."],
      "artifacts": ["Published agent flow tool", "Three test-run records"],
      "verification": "Alle drei Pfade liefern den erwarteten Status; fehlende Eingaben lösen eine gezielte Korrektur aus.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-04-build-a-request-intake-flow-with-human-review.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview", "https://learn.microsoft.com/en-us/power-automate/modern-approvals"]
    },
    {
      "id": "lab-05",
      "sequence": 5,
      "title": "Lab 5: Geführtes Topic mit Variablen und Grounding",
      "topic": "Topics/Antworten",
      "domainId": "d1",
      "objective": "Ein Request Service Help Topic mit scoped Variablen, grounded guidance und sicherer Übergabe an den Intake-Flow erstellen.",
      "prerequisites": ["Lab 4 Intake-Flow", "Copilot-Studio-Topic-Autoring"],
      "steps": ["Request Service Help Topic erstellen.", "Fragen und typed/scoped Variablen definieren.", "Grounded-Answer-Schritt für Service-Hinweise konfigurieren.", "Validierung und Fallback für unvollständige Angaben ergänzen.", "Vollständigen Dialog testen und an den Intake-Flow übergeben."],
      "artifacts": ["Guided topic", "Variable map", "Grounded answer test record"],
      "verification": "Variablen bleiben im Topic-Scope, Antworten sind geerdet und eine vollständige Anfrage wird korrekt übergeben.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-05-create-a-guided-topic-with-variables-and-grounded-answers.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-create-edit-topics", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-boost-node"]
    },
    {
      "id": "lab-06",
      "sequence": 6,
      "title": "Lab 6: Adaptive Card und sichere HTTP-Antwort",
      "topic": "Topics/Antworten",
      "domainId": "d1",
      "objective": "Eine wiederverwendbare Bestätigungskarte und ein Status-Lookup-Topic mit sicherem Mapping synthetischer HTTP-Antworten bauen.",
      "prerequisites": ["Lab 5 Topic", "Adaptive-Card-JSON und REST/HTTP-Grundlagen"],
      "steps": ["Adaptive-Card-Definition aus den Repository-Ressourcen prüfen.", "Karte mit Zusammenfassung und Submit-Aktion einfügen.", "Status Lookup Topic mit HTTP-Aufruf anlegen.", "Erfolg, Not-found und Fehlerantworten auf sichere Texte mappen.", "Karten-Submit sowie alle HTTP-Zustände im Testchat prüfen."],
      "artifacts": ["Reusable confirmation card", "Status Lookup topic", "Safe response mapping"],
      "verification": "Die Karte übergibt strukturierte Werte; kein HTTP-Fehler oder Rohinhalt wird ungefiltert an den Benutzer ausgegeben.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-06-add-an-adaptive-card-and-safe-http-response.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-cards-overview", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-plugin-actions"]
    },
    {
      "id": "lab-07",
      "sequence": 7,
      "title": "Lab 7: Agent mit Enterprise Knowledge grounden",
      "topic": "Knowledge/RAG",
      "domainId": "d2",
      "objective": "Die bereitgestellte synthetische Contoso-Service-Wissensquelle konfigurieren und Antworten mit Zitaten und Evidenz protokollieren.",
      "prerequisites": ["Lab 5 grounded topic", "contoso-service-knowledge.md"],
      "steps": ["Synthetische Wissensdatei prüfen und als Quelle bereitstellen.", "Knowledge-Konfiguration des Agenten öffnen.", "Quelle hinzufügen und Zugriffskontext dokumentieren.", "Fünf repräsentative Fragen im Testchat stellen.", "Antwort, Zitat und Evidenznotiz je Frage speichern."],
      "artifacts": ["Configured knowledge source", "Five-question retrieval record"],
      "verification": "Jede Frage hat eine nachvollziehbare Antwort, Quelle/Zitat und Evidenznotiz; unbelegte Behauptungen werden erkannt.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-07-ground-the-agent-in-enterprise-knowledge.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"]
    },
    {
      "id": "lab-08",
      "sequence": 8,
      "title": "Lab 8: Azure AI Search anbinden und Retrieval validieren",
      "topic": "Knowledge/RAG",
      "domainId": "d2",
      "objective": "Eine Azure-AI-Search-Wissensverbindung einrichten und Retrieval anhand repräsentativer sowie Boundary-Queries belegen.",
      "prerequisites": ["Lab 7 Knowledge-Quelle", "Instructor-enabled Azure AI Search"],
      "steps": ["Bereitgestellten Azure-AI-Search-Endpunkt und Index prüfen.", "Verbindung als Wissensquelle im Agenten konfigurieren.", "Authentifizierung und Berechtigungsgrenzen dokumentieren.", "Repräsentative und Boundary-Queries ausführen.", "Treffer, Zitate, Fehlgrenzen und Latenz in einer Retrieval-Matrix festhalten."],
      "artifacts": ["Azure AI Search knowledge connection", "Retrieval validation matrix"],
      "verification": "Die Matrix zeigt erwartete Treffer für Kernfragen und ein kontrolliertes Verhalten bei Grenzfragen.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-08-configure-azure-ai-search-and-validate-retrieval.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"]
    },
    {
      "id": "lab-09",
      "sequence": 9,
      "title": "Lab 9: Ticket-REST-API-Tool aus OpenAPI",
      "topic": "Tools/MCP/Computer Use",
      "domainId": "d2",
      "objective": "Ein Ticket-API-Tool oder einen Custom Connector aus der bereitgestellten OpenAPI-Beschreibung mit zwei Operationen bereitstellen.",
      "prerequisites": ["Lab 4 Flows", "ticket-api.openapi.yaml", "Instructor mock service"],
      "steps": ["OpenAPI-Ressource und Operationen prüfen.", "REST-API-Tool oder Custom Connector importieren.", "Parameter, Beschreibungen und Authentifizierung konfigurieren.", "Tool dem Contoso-Agenten hinzufügen.", "Zwei Operationen gegen den Mock-Service aufrufen und Ergebnisse dokumentieren."],
      "artifacts": ["Ticket API tool/custom connector", "Two recorded mock-service calls"],
      "verification": "Beide Operationen werden mit korrektem Parameter-Mapping aufgerufen; Fehler werden als sichere Agentenantwort dargestellt.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-09-add-a-ticket-rest-api-tool-from-openapi.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-plugin-actions", "https://learn.microsoft.com/en-us/connectors/custom-connectors/define-blank"]
    },
    {
      "id": "lab-10",
      "sequence": 10,
      "title": "Lab 10: MCP-Tools verbinden und Computer Use absichern",
      "topic": "Tools/MCP/Computer Use",
      "domainId": "d2",
      "objective": "Eine MCP-Verbindung mit verifiziertem Tool-Call und ein Guardrail-Design für Computer Use dokumentieren.",
      "prerequisites": ["Lab 9 Tool-Integration", "Instructor MCP server", "Training Windows machine"],
      "steps": ["MCP-Server und freigegebene Werkzeuge prüfen.", "MCP-Verbindung im Agenten konfigurieren.", "Einen nicht-destruktiven Tool-Call ausführen und Ergebnis sichern.", "Computer-Use-Zulässigkeiten, Bestätigungspunkte und Verbote definieren.", "Integrationsentscheidung und Sicherheitsgrenzen im ADR ergänzen."],
      "artifacts": ["Verified MCP connection", "Guarded computer-use instruction", "Integration-pattern decision record"],
      "verification": "Der MCP-Call ist nachvollziehbar; Computer Use verlangt Bestätigung für kritische Aktionen und verbietet Credential-Handling.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-10-connect-mcp-tools-and-guard-computer-use.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"]
    },
    {
      "id": "lab-11",
      "sequence": 11,
      "title": "Lab 11: Copilot Studio, Foundry und Fabric-Spezialisten verbinden",
      "topic": "Multi-Agent/A2A",
      "domainId": "d2",
      "objective": "Eine Connected-Agent-Topologie mit drei Spezialisten und einer Routing-Testmatrix entwerfen.",
      "prerequisites": ["Lab 7/8 Knowledge", "Copilot Studio", "Instructor-enabled Foundry und Fabric"],
      "steps": ["Aufgaben und Grenzen der drei Spezialisten definieren.", "Foundry- und Fabric-Agentenverträge mit Input/Output beschreiben.", "Spezialisten als Connected Agents konfigurieren.", "Routingregeln und Fallback für unklare Anfragen festlegen.", "Testmatrix für je einen eindeutigen und einen Grenzfall ausführen."],
      "artifacts": ["Connected-agent topology", "Three specialist contracts", "Routing test matrix"],
      "verification": "Jede Anfrage wird dem passenden Spezialisten zugeordnet oder kontrolliert zurückgewiesen; Verträge sind dokumentiert.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-11-connect-copilot-studio-foundry-and-fabric-specialists.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp", "https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview"]
    },
    {
      "id": "lab-12",
      "sequence": 12,
      "title": "Lab 12: Aufgabe über A2A delegieren",
      "topic": "Multi-Agent/A2A",
      "domainId": "d2",
      "objective": "Eine A2A-Verbindung zu einem instructor-hosted HTTPS-Endpunkt ausführen und den Round-Trip für den Betrieb absichern.",
      "prerequisites": ["Lab 11 Specialist contracts", "Instructor-hosted HTTPS A2A endpoint"],
      "steps": ["A2A-Endpoint-Vertrag und Authentifizierung prüfen.", "A2A-Verbindung im Copilot-Agenten anlegen.", "Aufgabe mit Kontext und Korrelations-ID delegieren.", "Antwort und Zwischenstatus als Round-Trip-Trace sichern.", "Timeout, Wiederholung, Berechtigungen und Fallback im Hardening-Checklist dokumentieren."],
      "artifacts": ["Working A2A connection", "Captured round-trip trace", "Production-hardening checklist"],
      "verification": "Trace enthält Request, Ziel, Korrelation, Antwort und Fehlerpfad; Secrets stehen ausschließlich in verwalteten Verbindungen.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-12-delegate-a-task-over-a2a.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp"]
    },
    {
      "id": "lab-13",
      "sequence": 13,
      "title": "Lab 13: Azure-Search-Evidenz in Foundry-Prompt nutzen",
      "topic": "Azure/Observability",
      "domainId": "d2",
      "objective": "Einen versionierten Custom Prompt mit stabilem JSON-Vertrag bauen, der Azure-Search-Evidenz vergleichbar verarbeitet.",
      "prerequisites": ["Lab 8 Retrieval-Matrix", "Lab 11 Foundry specialist", "foundry-evidence-fixtures.json"],
      "steps": ["Evidenz-Fixtures nach repräsentativen Fällen gruppieren.", "Custom Prompt mit Evidenz- und Unsicherheitsregeln formulieren.", "Stabiles JSON-Ausgabe-Schema definieren.", "Prompt versionieren und in Foundry/Copilot-Kontext einsetzen.", "Antworten über mehrere Evidenzsets vergleichen und Abweichungen notieren."],
      "artifacts": ["Versioned custom prompt", "Stable JSON contract", "Evidence comparison record"],
      "verification": "Alle Vergleichsfälle liefern parsebares JSON; fehlende Evidenz führt zu transparenter Unsicherheit statt Erfindung.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-13-use-azure-search-evidence-in-a-foundry-prompt.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview"]
    },
    {
      "id": "lab-14",
      "sequence": 14,
      "title": "Lab 14: Agent mit Application Insights instrumentieren",
      "topic": "Azure/Observability",
      "domainId": "d2",
      "objective": "Telemetry-Anbindung, gespeicherte KQL-Abfragen und eine Service-Health-Sicht für den Contoso-Agenten erstellen.",
      "prerequisites": ["Azure Application Insights access", "Lab 13 prompt", "application-insights-queries.kql"],
      "steps": ["Application-Insights-Ressource und Berechtigungen prüfen.", "Telemetry-Verbindung im Agenten konfigurieren.", "Testkonversationen und repräsentative Fehler erzeugen.", "Repository-KQL-Abfragen ausführen und bei Bedarf anpassen.", "Antwortzeit, Fehler und Nutzung in einer Health-Sicht zusammenfassen."],
      "artifacts": ["Telemetry connection", "Saved KQL queries", "One-page service-health view"],
      "verification": "Telemetry ist sichtbar; KQL liefert mindestens Antwortzeit- und Fehlerindikatoren für den Testzeitraum.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-14-instrument-the-agent-with-application-insights.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/dynamics365/guidance/resources/copilot-studio-appinsights", "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview"]
    },
    {
      "id": "lab-15",
      "sequence": 15,
      "title": "Lab 15: Repräsentatives Agent-Testset erstellen",
      "topic": "Evaluation",
      "domainId": "d3",
      "objective": "Ein versioniertes Contoso Core Quality Testset importierbar aufbereiten und auf vier Qualitätskategorien abbilden.",
      "prerequisites": ["Labs 1-14 Artefakte", "contoso-test-set.csv", "contoso-test-design.csv"],
      "steps": ["Testdesign und CSV-Spalten aus den Repository-Ressourcen prüfen.", "Intent-, Grounding-, Safety- und Handoff-Fälle auswählen.", "Erwartete Antworten und Bewertungskriterien ergänzen.", "Testset versionieren und in die Evaluationsfunktion importieren.", "Traceability von jedem Fall zur Qualitätskategorie prüfen."],
      "artifacts": ["Versioned Contoso Core Quality test set", "Quality traceability design"],
      "verification": "Jeder Testfall ist eindeutig, reproduzierbar, einer Qualitätskategorie zugeordnet und plattformgerecht importierbar.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-15-build-a-representative-agent-test-set.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot"]
    },
    {
      "id": "lab-16",
      "sequence": 16,
      "title": "Lab 16: Evaluation ausführen und Defekte triagieren",
      "topic": "Evaluation",
      "domainId": "d3",
      "objective": "Eine Baseline-Evaluation ausführen, Defekte evidenzbasiert priorisieren und eine begründete Änderung vergleichen.",
      "prerequisites": ["Lab 15 Testset", "Lab 14 Telemetry", "Activity Map access"],
      "steps": ["Testset gegen die Baseline ausführen.", "Scores, Transcripts und Activity-Map-Evidenz sichern.", "Fehler nach Schwere, Ursache und Kategorie triagieren.", "Eine priorisierte Änderung an Topic, Grounding oder Tool umsetzen.", "Evaluation wiederholen und Before/After-Vergleich dokumentieren."],
      "artifacts": ["Baseline evaluation record", "Defect-triage table", "Before-and-after comparison"],
      "verification": "Jeder triagierte Defekt verweist auf Evidenz; die Änderung zeigt eine messbare oder begründete Verbesserung ohne neue Regression.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-16-run-evaluation-and-triage-agent-defects.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot"]
    },
    {
      "id": "lab-17",
      "sequence": 17,
      "title": "Lab 17: Agent-Lösung und Abhängigkeitsinventar",
      "topic": "Packaging/ALM",
      "domainId": "d3",
      "objective": "Die ContosoServiceAgent-Lösung als unmanaged solution anlegen und Komponenten sowie Abhängigkeiten reviewbar inventarisieren.",
      "prerequisites": ["Labs 1-16 fertiger Agent", "Power Apps maker portal"],
      "steps": ["Unmanaged solution ContosoServiceAgent anlegen.", "Agent, Topics, Flows, Tools und Konfiguration hinzufügen.", "Komponenten- und Abhängigkeitsinventar exportieren.", "Besitzer, Zweck und Zielumgebung je Komponente dokumentieren.", "Inventar auf fehlende oder unbeabsichtigte Abhängigkeiten reviewen."],
      "artifacts": ["ContosoServiceAgent solution", "Reviewed component/dependency inventory"],
      "verification": "Die Lösung enthält die benötigten Komponenten; jede externe Abhängigkeit hat Owner und Auflösungsplan.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-17-create-the-agent-solution-and-dependency-inventory.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm"]
    },
    {
      "id": "lab-18",
      "sequence": 18,
      "title": "Lab 18: Umgebungsvariablen und Connection References",
      "topic": "Packaging/ALM",
      "domainId": "d3",
      "objective": "Eine umgebungsspezifische Konfigurationsmatrix für Development, Test und Production erstellen.",
      "prerequisites": ["Lab 17 solution", "Power Platform solutions"],
      "steps": ["Konfigurationswerte und Geheimnisse von der Lösung trennen.", "Environment Variables für Endpunkte und Schalter definieren.", "Connection References für Flows und Tools anlegen.", "Owner, Datentyp, Zielwert und Deployment-Verantwortung je Eintrag erfassen.", "Matrix für Development, Test und Production reviewen."],
      "artifacts": ["Configuration matrix", "Environment variables", "Connection references"],
      "verification": "Keine Credentials liegen in Prompts oder Source Control; jede Verbindung und jeder Wert ist einer Zielumgebung zugeordnet.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-18-configure-environment-variables-and-connection-references.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/powerapps/maker/data-platform/environmentvariables", "https://learn.microsoft.com/en-us/powerapps/maker/data-platform/create-connection-reference"]
    },
    {
      "id": "lab-19",
      "sequence": 19,
      "title": "Lab 19: Über Power Platform Pipeline deployen",
      "topic": "Release/Operations",
      "domainId": "d3",
      "objective": "ContosoServiceAgent 1.0.0.0 kontrolliert durch eine Power Platform Pipeline deployen und Vor-/Nachweise sichern.",
      "prerequisites": ["Lab 17 solution", "Lab 18 configuration matrix", "Power Platform Pipelines"],
      "steps": ["Quell-, Zielumgebung und Pipeline-Berechtigungen prüfen.", "Solution-Version 1.0.0.0 paketieren.", "Pre-deployment-Checks und Abhängigkeiten ausführen.", "Deployment über die Pipeline starten und Status protokollieren.", "Post-deployment-Test, Konfiguration und Evidenz sichern."],
      "artifacts": ["Pipeline deployment record", "Pre-deployment evidence", "Post-deployment evidence"],
      "verification": "Deployment ist versioniert und erfolgreich; Zielumgebung besteht Smoke-Test und Konfigurationsprüfung.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-19-deploy-through-a-power-platform-pipeline.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/power-platform/alm/pipelines"]
    },
    {
      "id": "lab-20",
      "sequence": 20,
      "title": "Lab 20: Release, Monitoring und Recovery proben",
      "topic": "Release/Operations",
      "domainId": "d3",
      "objective": "Ein vollständiges Release-Runbook mit Incident-Timeline, Recovery-Evidenz und 30-Tage-Betriebsrhythmus erstellen.",
      "prerequisites": ["Lab 19 deployment", "Application Insights", "Agent evaluation", "deployment-checklist.md"],
      "steps": ["Deployment-Checklist und Release-Gates ausführen.", "Monitoring-Signale, Qualitäts- und Sicherheits-SLOs festlegen.", "Einen kontrollierten Incident mit Timeline simulieren.", "Rollback oder Recovery ausführen und Evidenz sichern.", "On-call, Review, Evaluation und 30-Tage-Cadence im Runbook festhalten."],
      "artifacts": ["Release runbook", "Incident timeline", "Recovery evidence", "30-day operating cadence"],
      "verification": "Runbook beschreibt Release-Gates, Alarme, Owner, Recovery-Schritte und einen überprüfbaren 30-Tage-Betriebsplan.",
      "repositoryUrl": "https://github.com/tertiarycourses/C1760-AB-620-Microsoft-Certified-AI-Agent-Builder-Associate/blob/main/labs/lab-20-rehearse-release-monitoring-and-recovery.md",
      "msLearnRefs": ["https://learn.microsoft.com/en-us/power-platform/alm/pipelines", "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot"]
    }
  ],
  "examBank": [
    {
      "id": "q001",
      "domain": "d1",
      "sourceLearningItemId": "d1-001",
      "question": "Welche drei Authentifizierungsoptionen bietet Copilot Studio für Agenten?",
      "options": [
        "Keine Authentifizierung, Mit Microsoft authentifizieren, Manuell authentifizieren",
        "OAuth2, SAML, Kerberos",
        "Basic Auth, API Key, Zertifikat",
        "Anonym, Gast, Vollzugriff"
      ],
      "correctIndex": 0,
      "explanation": "Copilot Studio bietet die drei Optionen 'Keine Authentifizierung', 'Mit Microsoft authentifizieren' und 'Manuell authentifizieren'. Änderungen werden erst nach Veröffentlichung wirksam.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
    },
    {
      "id": "q002",
      "domain": "d1",
      "sourceLearningItemId": "d1-002",
      "question": "Worauf kann ein Agent bei der Option 'Keine Authentifizierung' zugreifen?",
      "options": [
        "Nur auf öffentliche Informationen und Ressourcen",
        "Auf alle Dataverse-Tabellen des Tenants",
        "Auf beliebige SharePoint-Bibliotheken",
        "Auf private Nutzerprofile"
      ],
      "correctIndex": 0,
      "explanation": "Bei 'Keine Authentifizierung' kann jeder mit dem Link chatten; der Agent kann dabei nur auf öffentliche Informationen und Ressourcen zugreifen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
    },
    {
      "id": "q003",
      "domain": "d1",
      "sourceLearningItemId": "d1-003",
      "question": "Auf welche Kanäle ist die Option 'Authenticate with Microsoft' beschränkt?",
      "options": [
        "Teams + Microsoft 365 (sowie native/Custom-App-Kanäle)",
        "Nur Facebook",
        "Nur die Demo-Website",
        "Alle Azure Bot Service Kanäle gleichermaßen"
      ],
      "correctIndex": 0,
      "explanation": "'Authenticate with Microsoft' richtet Entra-ID-Authentifizierung für Teams automatisch ein und ist auf den Kanal 'Teams + Microsoft 365' (sowie native/Custom-App-Kanäle) beschränkt.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
    },
    {
      "id": "q004",
      "domain": "d1",
      "sourceLearningItemId": "d1-004",
      "question": "Welche Variable steht NUR bei 'Authenticate manually', nicht aber bei 'Authenticate with Microsoft' zur Verfügung?",
      "options": [
        "User.AccessToken",
        "User.ID",
        "User.DisplayName",
        "Keine der genannten"
      ],
      "correctIndex": 0,
      "explanation": "Bei manueller Authentifizierung stehen User.Id, User.DisplayName, User.AccessToken und User.IsLoggedIn zur Verfügung, während bei 'Authenticate with Microsoft' nur User.ID und User.DisplayName verfügbar sind.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
    },
    {
      "id": "q005",
      "domain": "d1",
      "sourceLearningItemId": "d1-006",
      "question": "Warum erstellt Copilot Studio standardmäßig Federated Identity Credentials (FIC) in der Azure App Registration?",
      "options": [
        "Für sichere, secret-lose Authentifizierung mittels kurzlebiger OpenID-Connect-Token gemäß Zero-Trust-Standards",
        "Um Client Secrets zu verschlüsseln",
        "Um SSO zu deaktivieren",
        "Um Passwort-Hashes zu speichern"
      ],
      "correctIndex": 0,
      "explanation": "FIC ermöglicht sichere, secret-lose Authentifizierung mit kurzlebigen OpenID-Connect-Token und entspricht Microsofts Zero-Trust-Sicherheitsstandards; Client Secrets sollten nur genutzt werden, wenn FIC nicht möglich ist.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad"
    },
    {
      "id": "q006",
      "domain": "d1",
      "sourceLearningItemId": "d1-007",
      "question": "Welche Redirect-URI muss bei der App-Registrierung für Entra-ID-Authentifizierung hinterlegt werden?",
      "options": [
        "https://token.botframework.com/.auth/web/redirect",
        "https://login.microsoftonline.com/redirect",
        "https://copilotstudio.microsoft.com/callback",
        "https://graph.microsoft.com/auth"
      ],
      "correctIndex": 0,
      "explanation": "Es muss 'https://token.botframework.com/.auth/web/redirect' (bzw. die europäische Variante) hinterlegt werden, mit aktivierten Access- und ID-Tokens.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad"
    },
    {
      "id": "q007",
      "domain": "d1",
      "sourceLearningItemId": "d1-008",
      "question": "Wofür wird die Token Exchange URL in der Authentifizierungskonfiguration von Copilot Studio benötigt?",
      "options": [
        "Für den Austausch des On-Behalf-Of (OBO) Tokens gegen das Zugriffstoken bei SSO",
        "Für das Löschen abgelaufener Sessions",
        "Für die Verschlüsselung von Chat-Nachrichten",
        "Für die Registrierung neuer Connectors"
      ],
      "correctIndex": 0,
      "explanation": "Die Token Exchange URL wird genutzt, um das OBO-Token gegen das angeforderte Zugriffstoken auszutauschen; sie ist für SSO erforderlich.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad"
    },
    {
      "id": "q008",
      "domain": "d1",
      "sourceLearningItemId": "d1-009",
      "question": "Welcher Scope wird für SharePoint als Datenquelle bei SSO typischerweise benötigt?",
      "options": [
        "Sites.Read.All Files.Read.All",
        "ExternalItem.Read.All",
        "user_impersonation",
        "Mail.Read"
      ],
      "correctIndex": 0,
      "explanation": "Für SharePoint werden zusätzlich zu 'profile openid' die Scopes 'Sites.Read.All Files.Read.All' benötigt, während 'ExternalItem.Read.All' für Graph Connections gilt.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-authentication-azure-ad"
    },
    {
      "id": "q009",
      "domain": "d1",
      "sourceLearningItemId": "d1-010",
      "question": "Wie viele Konfigurationsschritte umfasst die Einrichtung von SSO in Copilot Studio laut Dokumentation?",
      "options": [
        "Fünf",
        "Drei",
        "Sieben",
        "Zwei"
      ],
      "correctIndex": 0,
      "explanation": "Die SSO-Konfiguration umfasst fünf Schritte: manuelle Authentifizierung aktivieren, App-Registrierung für Custom Canvas erstellen, Custom Scope definieren, Scope zur Agentenkonfiguration hinzufügen, Custom-Canvas-Clientcode konfigurieren.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso"
    },
    {
      "id": "q010",
      "domain": "d1",
      "sourceLearningItemId": "d1-011",
      "question": "Für welchen Kanal wird SSO mit Microsoft Entra ID NICHT unterstützt?",
      "options": [
        "Demo-Website",
        "Custom Website",
        "Microsoft Teams",
        "Omnichannel for Customer Service (Live-Chat)"
      ],
      "correctIndex": 0,
      "explanation": "SSO wird für Custom Website, Teams und Omnichannel-Live-Chat unterstützt, jedoch nicht für die Demo-Website, Azure Bot Service-Kanäle, Facebook, Mobile App oder Power Apps Portale.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso"
    },
    {
      "id": "q011",
      "domain": "d1",
      "sourceLearningItemId": "d1-012",
      "question": "Warum sollten bei SSO zwei separate App-Registrierungen erstellt werden?",
      "options": [
        "Aus Sicherheitsgründen soll dieselbe App-Registrierung nicht für Agent und Website wiederverwendet werden",
        "Weil Azure maximal eine Registrierung pro Scope erlaubt",
        "Weil Teams eine eigene Registrierung zwingend voraussetzt",
        "Weil sonst SSO gar nicht aktivierbar ist"
      ],
      "correctIndex": 0,
      "explanation": "Es sollten eine Authentication App Registration und eine separate Canvas App Registration erstellt werden – Wiederverwendung derselben Registrierung wird aus Sicherheitsgründen abgeraten.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso"
    },
    {
      "id": "q012",
      "domain": "d1",
      "sourceLearningItemId": "d1-016",
      "question": "Welcher Gruppe werden Connectors standardmäßig zugeordnet, wenn eine neue Data Policy erstellt wird?",
      "options": [
        "Non-Business",
        "Business",
        "Blocked",
        "Restricted"
      ],
      "correctIndex": 0,
      "explanation": "Beim Erstellen einer neuen Data Policy werden alle Connectors zunächst 'Non-Business' zugeordnet; Microsoft empfiehlt, diese Gruppe auch als Standard beizubehalten.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/admin/dlp-connector-classification"
    },
    {
      "id": "q013",
      "domain": "d1",
      "sourceLearningItemId": "d1-017",
      "question": "Welche Connectors können laut Dokumentation NICHT durch eine Standard-Data-Policy blockiert werden?",
      "options": [
        "Dataverse, Approvals und Notifications",
        "Custom HTTP Connectors",
        "Twitter und Slack",
        "Alle Premium-Connectors"
      ],
      "correctIndex": 0,
      "explanation": "Kern-Connectors wie Dataverse, Approvals, Notifications sowie Microsoft-365-Enterprise-Standard-Connectors können nicht blockiert werden; Advanced Connector Policies (ACP) können jedoch auch diese einschränken.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/admin/dlp-connector-classification"
    },
    {
      "id": "q014",
      "domain": "d1",
      "sourceLearningItemId": "d1-019",
      "question": "Welchen Connector muss man per Data Policy blockieren, um zu verhindern, dass Maker nicht-authentifizierte Agenten veröffentlichen?",
      "options": [
        "Chat without Microsoft Entra ID authentication in Copilot Studio",
        "Dataverse",
        "SharePoint",
        "HTTP"
      ],
      "correctIndex": 0,
      "explanation": "Blockiert man 'Chat without Microsoft Entra ID authentication in Copilot Studio' per Data Policy, können Maker nur noch 'Authenticate with Microsoft' oder 'Authenticate manually' wählen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention"
    },
    {
      "id": "q015",
      "domain": "d1",
      "sourceLearningItemId": "d1-023",
      "question": "Welche Kernprinzipien folgen aus dem Microsoft Responsible AI Standard, dem Copilot Studio unterliegt?",
      "options": [
        "Fairness, Accountability, Transparency, Ethics",
        "Speed, Cost, Scale, Security",
        "Privacy, Marketing, Sales, Support",
        "Compliance, Latency, Uptime, Revenue"
      ],
      "correctIndex": 0,
      "explanation": "Copilot Studio folgt dem Microsoft Responsible AI Standard mit den Kernprinzipien Fairness, Accountability, Transparency und Ethics.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/responsible-ai"
    },
    {
      "id": "q016",
      "domain": "d1",
      "sourceLearningItemId": "d1-032",
      "question": "Welche Eigenschaft zeichnet Agent Flows in Copilot Studio grundlegend aus?",
      "options": [
        "Sie sind deterministisch – dieselbe Eingabe erzeugt immer dieselbe Ausgabe",
        "Sie sind stochastisch und variieren bei gleicher Eingabe",
        "Sie können nur per natürlicher Sprache erstellt werden",
        "Sie unterstützen ausschließlich HTTP-Trigger"
      ],
      "correctIndex": 0,
      "explanation": "Agent Flows sind deterministisch: dieselbe Eingabe erzeugt immer dieselbe Ausgabe. Sie können per natürlicher Sprache oder im visuellen Drag-and-Drop-Designer erstellt werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview"
    },
    {
      "id": "q017",
      "domain": "d1",
      "sourceLearningItemId": "d1-034",
      "question": "Wofür wird die 'Request Information'-Aktion (RFI) in Agent Flows verwendet?",
      "options": [
        "Um Ausführung zu pausieren und Eingaben menschlicher Prüfer per Outlook-E-Mail zu sammeln",
        "Um automatisch alle offenen Genehmigungen abzulehnen",
        "Um Wissensquellen zu synchronisieren",
        "Um Umgebungsvariablen zu setzen"
      ],
      "correctIndex": 0,
      "explanation": "Die RFI-Aktion pausiert die Ausführung, sammelt Eingaben von zugewiesenen menschlichen Prüfern per E-Mail via Outlook und nutzt diese in nachfolgenden Schritten – ein zentrales Human-in-the-Loop-Element.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information"
    },
    {
      "id": "q018",
      "domain": "d1",
      "sourceLearningItemId": "d1-043",
      "question": "Wie viele Variablen-Scopes gibt es in Copilot Studio?",
      "options": [
        "Vier: Topic-, globale, System- und Environment-Variablen",
        "Zwei: lokal und global",
        "Drei: privat, geschützt, öffentlich",
        "Fünf, inklusive Session-Variablen"
      ],
      "correctIndex": 0,
      "explanation": "Es gibt vier Scopes: Topic-Variablen (Standard), globale Variablen, System-Variablen und Environment-Variablen (in Power Platform erstellt, in Copilot Studio nur lesbar).",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables-about"
    },
    {
      "id": "q019",
      "domain": "d1",
      "sourceLearningItemId": "d1-051",
      "question": "Ab welcher ungefähren Anzahl an Auswahlmöglichkeiten (Tools, Topics, andere Agenten) sollte laut Faustregel eine Multi-Agent-Aufteilung erwogen werden?",
      "options": [
        "Mehr als 30-40",
        "Mehr als 5",
        "Mehr als 200",
        "Es gibt keine Faustregel"
      ],
      "correctIndex": 0,
      "explanation": "Als Faustregel kann die Leistung eines Agenten abnehmen, sobald er mehr als 30-40 Auswahlmöglichkeiten hat; dann sollte die Lösung auf mehrere verbundene Agenten aufgeteilt werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents"
    },
    {
      "id": "q020",
      "domain": "d1",
      "sourceLearningItemId": "d1-046",
      "question": "Welche Adaptive-Cards-Schemaversion rendert Copilot Studio nur im Testchat, nicht im Canvas?",
      "options": [
        "Version 1.6",
        "Version 1.0",
        "Version 2.0",
        "Version 1.3"
      ],
      "correctIndex": 0,
      "explanation": "Copilot Studio unterstützt Adaptive-Cards-Schemaversionen 1.6 und früher, rendert Version-1.6-Karten aber nur im Testchat, nicht im Canvas.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/adaptive-cards-overview"
    },
    {
      "id": "q021",
      "domain": "d1",
      "sourceLearningItemId": "d1-013",
      "question": "Was passiert innerhalb einer Data Policy, wenn Connectors unterschiedlichen Datengruppen zugeordnet sind?",
      "options": [
        "Sie dürfen keine Daten miteinander austauschen",
        "Sie werden automatisch synchronisiert",
        "Sie erhalten automatisch dieselbe Berechtigung",
        "Es gibt keine Einschränkung"
      ],
      "correctIndex": 0,
      "explanation": "Data Policies teilen Connectors in 'Business', 'Non-business' oder 'Blocked' ein; Connectors unterschiedlicher Gruppen dürfen innerhalb einer Policy keine Daten austauschen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention"
    },
    {
      "id": "q022",
      "domain": "d1",
      "sourceLearningItemId": "d1-041",
      "question": "Was passiert, wenn der Bot eines der System-Topics wie 'Escalate' oder 'Goodbye' auslöst?",
      "options": [
        "Die Konversation endet",
        "Der Agent startet automatisch neu",
        "Alle Variablen werden zurückgesetzt, die Konversation läuft weiter",
        "Der Agent wechselt automatisch den Kanal"
      ],
      "correctIndex": 0,
      "explanation": "Löst der Bot eines der System-Topics 'End of Conversation', 'Confirmed Success', 'Confirmed Failure', 'Goodbye', 'Escalate' oder 'Start over' aus, endet die Konversation.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-system-topics"
    },
    {
      "id": "q023",
      "domain": "d1",
      "sourceLearningItemId": "d1-054",
      "question": "Wie unterscheidet Copilot Studio zwischen Agents und Workflows?",
      "options": [
        "Agents führen Konversationen mit Wissensquellen/Tools, Workflows sind per Drag-and-Drop erstellte Automatisierungen mit Human-in-the-Loop",
        "Agents sind nur für Chat, Workflows nur für E-Mail",
        "Beide Begriffe sind synonym",
        "Workflows benötigen zwingend Azure Functions"
      ],
      "correctIndex": 0,
      "explanation": "Agents sind KI-Assistenten, die Konversationen führen, Wissensquellen nutzen und Tools einsetzen; Workflows sind per Drag-and-Drop erstellte Automatisierungen, die Agenten, Tools und Logik kombinieren und Human-in-the-Loop-Kontrollen enthalten.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio"
    },
    {
      "id": "q024",
      "domain": "d2",
      "sourceLearningItemId": "d2-002",
      "question": "Welche der folgenden Wissensquellentypen wird von Copilot Studio unterstützt?",
      "options": [
        "Public Website (Bing-Suche auf vorgegebenen Seiten)",
        "MongoDB Atlas",
        "Amazon S3",
        "Snowflake"
      ],
      "correctIndex": 0,
      "explanation": "Copilot Studio unterstützt u.a. Public Website (Bing-Suche), Documents, SharePoint, Dataverse sowie Enterprise-Daten über Konnektoren.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
    },
    {
      "id": "q025",
      "domain": "d2",
      "sourceLearningItemId": "d2-003",
      "question": "Wie wirkt sich die Microsoft-Entra-ID-Authentifizierung des Agentenbenutzers bei SharePoint/Dataverse-Wissensquellen aus?",
      "options": [
        "Der Agent zeigt nur Inhalte, auf die die Person tatsächlich Zugriff hat",
        "Der Agent zeigt allen Nutzern dieselben Inhalte",
        "Die Authentifizierung wird ignoriert",
        "Nur Admins sehen gefilterte Inhalte"
      ],
      "correctIndex": 0,
      "explanation": "Bei SharePoint, Dataverse und Enterprise-Daten via Konnektoren gilt die Entra-ID-Authentifizierung des jeweiligen Agentenbenutzers: der Agent zeigt nur Inhalte, auf die die Person tatsächlich Zugriff hat.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
    },
    {
      "id": "q026",
      "domain": "d2",
      "sourceLearningItemId": "d2-004",
      "question": "Wie viele SharePoint-URLs sind bei klassischer Orchestrierung als Wissensquelle maximal erlaubt?",
      "options": [
        "4",
        "10",
        "25",
        "Unbegrenzt"
      ],
      "correctIndex": 0,
      "explanation": "In der klassischen Orchestrierung gelten harte Limits, z.B. max. 4 SharePoint-URLs und 2 Dataverse-Quellen mit je bis zu 15 Tabellen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
    },
    {
      "id": "q027",
      "domain": "d2",
      "sourceLearningItemId": "d2-005",
      "question": "Was bewirkt die Einstellung 'Allow ungrounded responses'?",
      "options": [
        "Sie steuert, ob der Agent auch ohne Wissensquelle/Tool rein aus Modellwissen antworten darf",
        "Sie deaktiviert alle Wissensquellen dauerhaft",
        "Sie erzwingt die Nutzung von Bing bei jeder Antwort",
        "Sie aktiviert automatisch SSO"
      ],
      "correctIndex": 0,
      "explanation": "'Allow ungrounded responses' (nur bei generativer Orchestrierung) steuert, ob der Agent ohne Wissensquelle/Tool antworten darf; ist sie deaktiviert, wird das Fallback-Thema ausgelöst.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
    },
    {
      "id": "q028",
      "domain": "d2",
      "sourceLearningItemId": "d2-006",
      "question": "Was bedeutet die Markierung einer Wissensquelle als 'Official Source'?",
      "options": [
        "Der Agent nutzt sie direkt ohne zusätzliche Verifikation, da sie als vertrauenswürdig gilt",
        "Sie wird automatisch täglich neu indiziert",
        "Sie erhält höhere Rechenleistung",
        "Sie kann nicht mehr gelöscht werden"
      ],
      "correctIndex": 0,
      "explanation": "Eine als 'Official Source' markierte Quelle unterliegt einem strengen Verifizierungsprozess und wird vom Agenten direkt ohne zusätzliche Verifikation genutzt; dies ist bei generativer Orchestrierung nicht kompatibel.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio"
    },
    {
      "id": "q029",
      "domain": "d2",
      "sourceLearningItemId": "d2-007",
      "question": "Wie trennt man mehrere SharePoint-URLs beim Hinzufügen als Wissensquelle?",
      "options": [
        "Mit Zeilenumbruch (Shift+Enter)",
        "Mit Semikolon",
        "Mit Komma",
        "Jede URL benötigt eine eigene Wissensquelle"
      ],
      "correctIndex": 0,
      "explanation": "Beim Hinzufügen von SharePoint als Wissensquelle können mehrere URLs mit Zeilenumbruch (Shift+Enter) getrennt eingegeben werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint"
    },
    {
      "id": "q030",
      "domain": "d2",
      "sourceLearningItemId": "d2-009",
      "question": "Welche Authentifizierungsoption steht beim Erstellen einer Azure-AI-Search-Verbindung NICHT zur Auswahl?",
      "options": [
        "Basic Auth mit Benutzername/Passwort",
        "Access Key",
        "Service Principal (Microsoft Entra ID Application)",
        "Microsoft Entra ID Integrated"
      ],
      "correctIndex": 0,
      "explanation": "Als Authentifizierungstyp stehen Access Key, Client Certificate Auth, Service Principal (Entra ID Application) oder Microsoft Entra ID Integrated zur Wahl – Basic Auth ist nicht vorgesehen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
    },
    {
      "id": "q031",
      "domain": "d2",
      "sourceLearningItemId": "d2-010",
      "question": "Welches Indexfeld interpretiert Copilot Studio automatisch als Zitat bei Azure AI Search?",
      "options": [
        "metadata_storage_path",
        "document_id",
        "content_vector",
        "source_type"
      ],
      "correctIndex": 0,
      "explanation": "Existiert das Feld 'metadata_storage_path', interpretiert Copilot Studio dieses als Zitat; andernfalls wird jedes Feld mit einer vollständigen URL als Zitat verwendet.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search"
    },
    {
      "id": "q032",
      "domain": "d2",
      "sourceLearningItemId": "d2-012",
      "question": "Was kann ein MCP-Server laut Copilot-Studio-Dokumentation bereitstellen, das Copilot Studio aktuell unterstützt?",
      "options": [
        "Tools und Resources",
        "Nur Prompts",
        "Nur Resources",
        "Ausschließlich Tools ohne Resources"
      ],
      "correctIndex": 0,
      "explanation": "Ein MCP-Server kann Resources, Tools und Prompts bereitstellen; Copilot Studio unterstützt aktuell MCP Tools und Resources.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp"
    },
    {
      "id": "q033",
      "domain": "d2",
      "sourceLearningItemId": "d2-014",
      "question": "Was ist Voraussetzung, um MCP in Copilot Studio zu nutzen?",
      "options": [
        "Die generative Orchestrierung muss für den Agenten aktiviert sein",
        "Der Agent muss auf Teams veröffentlicht sein",
        "SSO muss deaktiviert sein",
        "Der Tenant muss Premium-Konnektoren lizenziert haben"
      ],
      "correctIndex": 0,
      "explanation": "Um MCP in Copilot Studio zu nutzen, muss für den Agenten die generative Orchestrierung aktiviert sein.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp"
    },
    {
      "id": "q034",
      "domain": "d2",
      "sourceLearningItemId": "d2-015",
      "question": "Welchen Transporttyp unterstützt Copilot Studio seit August 2025 nicht mehr für MCP-Verbindungen?",
      "options": [
        "SSE (Server-Sent Events)",
        "Streamable",
        "HTTP/2",
        "WebSocket"
      ],
      "correctIndex": 0,
      "explanation": "Copilot Studio unterstützt aktuell ausschließlich den 'Streamable'-Transporttyp; SSE gilt als veraltet und wird seit August 2025 nicht mehr unterstützt.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
    },
    {
      "id": "q035",
      "domain": "d2",
      "sourceLearningItemId": "d2-017",
      "question": "Welche Authentifizierungsoptionen stehen beim MCP-Onboarding-Wizard zur Verfügung?",
      "options": [
        "None, API Key, OAuth 2.0",
        "Nur Kerberos",
        "Nur Zertifikate",
        "Nur Basic Auth"
      ],
      "correctIndex": 0,
      "explanation": "Beim Verbinden eines MCP-Servers über den Onboarding-Wizard stehen als Authentifizierung None, API Key (Header oder Query) sowie OAuth 2.0 zur Verfügung.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent"
    },
    {
      "id": "q036",
      "domain": "d2",
      "sourceLearningItemId": "d2-020",
      "question": "Worauf basiert die Computer-Use-Funktion in Copilot Studio technisch?",
      "options": [
        "Auf Computer-Using Agents (CUA), die Vision-Fähigkeiten mit Reasoning kombinieren",
        "Auf klassischen RPA-Makrorecordern ohne KI",
        "Auf reinem regelbasiertem Skripting",
        "Auf einem Selenium-WebDriver-Wrapper"
      ],
      "correctIndex": 0,
      "explanation": "Computer Use basiert auf Computer-Using Agents (CUA), einem KI-Modell, das Vision-Fähigkeiten mit Reasoning kombiniert, um mit GUIs zu interagieren.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
    },
    {
      "id": "q037",
      "domain": "d2",
      "sourceLearningItemId": "d2-021",
      "question": "Welches Modell gilt für Computer Use aktuell als 'Standard, generell verfügbar' (GA)?",
      "options": [
        "OpenAI Computer-Using Agent (CUA)",
        "Claude Opus 4.6",
        "Claude Sonnet 4.6",
        "GPT-4 Turbo"
      ],
      "correctIndex": 0,
      "explanation": "Für Computer Use ist OpenAI CUA als Standard-Modell generell verfügbar (GA); Claude Sonnet 4.5 ist ebenfalls GA, Claude Sonnet 4.6 und Opus 4.6 sind experimentell/Premium.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
    },
    {
      "id": "q038",
      "domain": "d2",
      "sourceLearningItemId": "d2-022",
      "question": "Welche Voraussetzung muss erfüllt sein, damit Computer Use für einen Agenten zur Verfügung steht?",
      "options": [
        "Generative Orchestrierung muss aktiviert sein",
        "Der Agent muss auf SharePoint veröffentlicht sein",
        "Der Agent darf keine Wissensquellen besitzen",
        "MCP muss deaktiviert sein"
      ],
      "correctIndex": 0,
      "explanation": "Das Computer-Use-Feature steht ausschließlich für Agenten mit aktivierter generativer Orchestrierung zur Verfügung.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
    },
    {
      "id": "q039",
      "domain": "d2",
      "sourceLearningItemId": "d2-023",
      "question": "Wie viele Copilot Credits verbraucht ein Computer-Use-Schritt bei einem Standardmodell?",
      "options": [
        "5 Credits",
        "15 Credits",
        "1 Credit",
        "50 Credits"
      ],
      "correctIndex": 0,
      "explanation": "Jeder Schritt (z.B. Klicken, Tippen, Navigieren) verbraucht 5 Copilot Credits bei Standardmodellen bzw. 15 Credits bei einem Premium-Modell wie Claude Opus 4.6.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/computer-use"
    },
    {
      "id": "q040",
      "domain": "d2",
      "sourceLearningItemId": "d2-025",
      "question": "Welche Ausführungsoption für Computer Use gilt als NICHT für Produktion empfohlen?",
      "options": [
        "Hosted Browser (Preview)",
        "Bring-your-own-machine",
        "Cloud PC Pool",
        "Keine – alle sind produktionsreif"
      ],
      "correctIndex": 0,
      "explanation": "Hosted Browser (Preview, powered by Windows 365 for Agents) benötigt kein Setup, wird aber nicht für Produktion empfohlen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-where-computer-use-runs"
    },
    {
      "id": "q041",
      "domain": "d2",
      "sourceLearningItemId": "d2-027",
      "question": "Was passiert, wenn bei Computer Use Human Supervision deaktiviert ist und kein Reviewer konfiguriert wurde?",
      "options": [
        "Die Session schlägt fehl, sobald eine Pause nötig wäre",
        "Der Agent führt die Aktion trotzdem automatisch aus",
        "Der Agent bricht sofort beim Start ab",
        "Es wird automatisch ein Standard-Reviewer zugewiesen"
      ],
      "correctIndex": 0,
      "explanation": "Wird kein Reviewer konfiguriert und Human Supervision deaktiviert, schlägt die Session fehl, sobald eine Pause (z.B. Bestätigung) nötig wäre.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/human-supervision-computer-use"
    },
    {
      "id": "q042",
      "domain": "d2",
      "sourceLearningItemId": "d2-028",
      "question": "In welchem Format muss die OpenAPI-Spezifikation für ein REST-API-Tool in Copilot Studio vorliegen?",
      "options": [
        "v2-JSON-Format (v3 wird automatisch übersetzt)",
        "Ausschließlich v3-YAML",
        "XML-Schema",
        "GraphQL-Schema"
      ],
      "correctIndex": 0,
      "explanation": "Copilot Studio benötigt eine OpenAPI-Spezifikation im v2-JSON-Format; wird eine v3-Spezifikation hochgeladen, übersetzt der Erstellungsprozess sie automatisch in v2.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
    },
    {
      "id": "q043",
      "domain": "d2",
      "sourceLearningItemId": "d2-030",
      "question": "Welche Empfehlung gilt für die Beschreibung eines REST-API-Tools zur besseren Orchestrierung?",
      "options": [
        "Konkrete Synonyme und Handlungsverben wie 'get, retrieve, find, display' verwenden",
        "Möglichst kurze, generische Formulierungen nutzen",
        "Nur den technischen Endpunktnamen angeben",
        "Beschreibungen komplett weglassen"
      ],
      "correctIndex": 0,
      "explanation": "Die Tool-Beschreibung wird von der Agenten-Orchestrierung genutzt, um zu entscheiden, wann das Tool aufgerufen wird; konkrete Synonyme und Handlungsverben verbessern dies.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-rest-api"
    },
    {
      "id": "q044",
      "domain": "d2",
      "sourceLearningItemId": "d2-031",
      "question": "Wie werden Power-Platform-Konnektoren grundsätzlich kategorisiert?",
      "options": [
        "Prebuilt Connectors (Standard/Premium) und Custom Connectors",
        "Nur in Free und Paid",
        "Nur in Cloud und On-Premises",
        "Nur in Read und Write"
      ],
      "correctIndex": 0,
      "explanation": "Konnektoren werden in Prebuilt Connectors (Standard-Konnektoren in allen Plänen, Premium-Konnektoren nur in bestimmten Plänen) sowie Custom Connectors unterteilt.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors"
    },
    {
      "id": "q045",
      "domain": "d2",
      "sourceLearningItemId": "d2-034",
      "question": "Was muss konfiguriert werden, damit ein Agent die Anmeldeinformationen des Makers statt individueller Nutzer-Credentials verwendet?",
      "options": [
        "Ein authentifizierter Kanal und die Option 'Maker-provided credentials'",
        "Nur die Aktivierung von SSO",
        "Ein Custom Connector ohne Authentifizierung",
        "Die Deaktivierung von Data Policies"
      ],
      "correctIndex": 0,
      "explanation": "Damit ein Agent die Anmeldeinformationen des Makers nutzt, muss ein authentifizierter Kanal konfiguriert und unter 'Credentials to use' die Option 'Maker-provided credentials' gewählt werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors"
    },
    {
      "id": "q046",
      "domain": "d2",
      "sourceLearningItemId": "d2-036",
      "question": "Wie unterscheiden sich Inline Agents (Child Agents) von Connected Agents?",
      "options": [
        "Inline Agents teilen den Kontext mit dem Hauptagenten, Connected Agents haben eigene Orchestrierung/Tools/Wissen",
        "Inline Agents haben eigene Tenants, Connected Agents nicht",
        "Beide sind funktional identisch",
        "Connected Agents können nur intern genutzt werden"
      ],
      "correctIndex": 0,
      "explanation": "Inline Agents (Child Agents) sind kleine, wiederverwendbare Subroutinen, die den Kontext mit dem Hauptagenten teilen; Connected Agents sind eigenständig mit eigener Orchestrierung, Tools und Wissen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns"
    },
    {
      "id": "q047",
      "domain": "d2",
      "sourceLearningItemId": "d2-037",
      "question": "Welche vier Governance-Aspekte müssen bei Connected Agents beachtet werden?",
      "options": [
        "Orchestrierung, Data Handoff, Security, Audit/Monitoring",
        "Preis, Lizenz, Region, Sprache",
        "UI, UX, Branding, Marketing",
        "Backup, Restore, Failover, Scaling"
      ],
      "correctIndex": 0,
      "explanation": "Bei Connected Agents müssen Orchestrierung, Data Handoff, Security und Audit/Monitoring als Governance-Aspekte beachtet werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns"
    },
    {
      "id": "q048",
      "domain": "d2",
      "sourceLearningItemId": "d2-039",
      "question": "Was besagt das 'Single Response Principle' in Multi-Agent-Konfigurationen?",
      "options": [
        "Pro Konversationsrunde soll nur der übergeordnete Agent mit dem Nutzer kommunizieren",
        "Jeder Subagent darf eine eigene Antwort an den Nutzer senden",
        "Nur ein einziges Topic pro Agent ist erlaubt",
        "Der Nutzer darf nur eine Nachricht pro Sitzung senden"
      ],
      "correctIndex": 0,
      "explanation": "Pro Konversationsrunde soll nur der übergeordnete Agent mit dem Nutzer kommunizieren; Subagenten fungieren als 'Researcher' und senden keine direkte Antwort.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns"
    },
    {
      "id": "q049",
      "domain": "d2",
      "sourceLearningItemId": "d2-042",
      "question": "Was muss beim Verbinden mit einem Microsoft-Foundry-Agenten angegeben werden?",
      "options": [
        "Foundry-Project-Endpoint-URL und Agent-Id",
        "Nur der Agentenname",
        "Ausschließlich die Tenant-ID",
        "Der Dataverse-Tabellenname"
      ],
      "correctIndex": 0,
      "explanation": "Beim Verbinden mit einem Microsoft-Foundry-Agenten müssen die Foundry-Project-Endpoint-URL sowie die Agent-Id angegeben werden; nur Agenten aus dem neuen Foundry-Portal können verbunden werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent"
    },
    {
      "id": "q050",
      "domain": "d2",
      "sourceLearningItemId": "d2-044",
      "question": "Was ist KEINE Voraussetzung dafür, dass ein Fabric Data Agent in der Auswahlliste von Copilot Studio erscheint?",
      "options": [
        "Der Data Agent muss auf Premium-Lizenz laufen",
        "Der Data Agent muss veröffentlicht und aktiv sein",
        "Data Agent und Copilot Studio müssen im selben Tenant liegen",
        "Der Nutzer benötigt Berechtigungen auf den Fabric-Workspace"
      ],
      "correctIndex": 0,
      "explanation": "Voraussetzungen sind Veröffentlichung/Aktivität des Data Agents, richtiges Konto, gleicher Tenant und Workspace-Berechtigungen – eine Premium-Lizenzpflicht wird nicht genannt.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/fabric/data-science/data-agent-microsoft-copilot-studio"
    },
    {
      "id": "q051",
      "domain": "d2",
      "sourceLearningItemId": "d2-046",
      "question": "Was zeichnet das Agent2Agent-Protokoll (A2A) im Vergleich zu einer klassischen HTTP-Verbindung aus?",
      "options": [
        "Es unterstützt mehrstufige (multiturn) Interaktionen und reiche kontextuelle Metadaten",
        "Es funktioniert nur mit REST-Verben GET und POST",
        "Es ersetzt Microsoft Entra ID vollständig",
        "Es ist nur für interne Copilot-Studio-Agenten nutzbar"
      ],
      "correctIndex": 0,
      "explanation": "A2A ermöglicht es einem Orchestrator, Aufgaben an externe Agenten zu senden und unterstützt im Gegensatz zu klassischem HTTP mehrstufige Interaktionen und reiche kontextuelle Metadaten.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
    },
    {
      "id": "q052",
      "domain": "d2",
      "sourceLearningItemId": "d2-047",
      "question": "Was gibt man beim Verbinden eines Agenten über A2A an?",
      "options": [
        "Die Endpoint-URL des A2A-Agenten (nicht die URL der Agent Card)",
        "Nur den Namen des Agenten",
        "Die IP-Adresse des Servers",
        "Den API-Key des Tenants"
      ],
      "correctIndex": 0,
      "explanation": "Es wird die Endpoint-URL des A2A-Agenten angegeben; besitzt der Agent eine gültige Agent Card, übernimmt Copilot Studio Name und Beschreibung automatisch daraus.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent"
    },
    {
      "id": "q053",
      "domain": "d2",
      "sourceLearningItemId": "d2-050",
      "question": "Welcher API-Endpunkt wird für 'Bring your own model' in Prompts NICHT unterstützt?",
      "options": [
        "Die Responses-API ('/openai/v1/responses')",
        "Der Chat-Completions-Endpunkt ('/chat/completions')",
        "Keiner, beide werden unterstützt",
        "Nur GPT-3.5 Endpunkte"
      ],
      "correctIndex": 0,
      "explanation": "Für benutzerdefinierte Foundry-Modell-Prompts wird nur der Chat-Completions-Endpunkt unterstützt; die Responses-API führt zum Fehler 'Resource not found'.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/bring-your-own-model-prompts"
    },
    {
      "id": "q054",
      "domain": "d2",
      "sourceLearningItemId": "d2-053",
      "question": "Wie heißt das Custom Event, das Copilot Studio für Generative Answers in Application Insights protokolliert?",
      "options": [
        "GenerativeAnswers",
        "AnswerGeneration",
        "KnowledgeQuery",
        "TopicResponse"
      ],
      "correctIndex": 0,
      "explanation": "Für Generative Answers protokolliert Copilot Studio Custom Events mit dem Namen 'GenerativeAnswers', aus deren customDimensions Felder wie conversationId, TopicName, Message, Result und Feedback extrahiert werden können.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/dynamics365/guidance/resources/copilot-studio-appinsights"
    },
    {
      "id": "q055",
      "domain": "d3",
      "sourceLearningItemId": "d3-002",
      "question": "Wofür wird die Option 'Track between topics' im Testpanel genutzt?",
      "options": [
        "Um den Konversationspfad automatisch zu verfolgen, wenn er von einem Topic zum nächsten wechselt",
        "Um Topics automatisch zu löschen",
        "Um Variablen automatisch zurückzusetzen",
        "Um Testergebnisse zu exportieren"
      ],
      "correctIndex": 0,
      "explanation": "'Track between topics' lässt den Konversationspfad automatisch verfolgen, wenn er von einem Topic zum nächsten wechselt; sie kann ausgeschaltet werden, wenn man sich auf ein Topic konzentrieren will.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot"
    },
    {
      "id": "q056",
      "domain": "d3",
      "sourceLearningItemId": "d3-007",
      "question": "Welche Einschränkung hat das 'Test your agent'-Panel bei zeitbasierten Ereignissen?",
      "options": [
        "Inaktivitäts-Trigger feuern im Testpanel möglicherweise nicht, selbst bei korrekter Konfiguration",
        "Das Testpanel kann keine Topics testen",
        "Das Testpanel unterstützt keine Variablen",
        "Es gibt keinerlei Einschränkungen"
      ],
      "correctIndex": 0,
      "explanation": "Zeitbasierte oder hintergrundausgelöste Ereignisse wie Inaktivitäts-Trigger feuern im Testpanel möglicherweise nicht; zur Validierung muss der Agent veröffentlicht und in einem Kanal wie Teams getestet werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot"
    },
    {
      "id": "q057",
      "domain": "d3",
      "sourceLearningItemId": "d3-008",
      "question": "Für welche Agenten steht die Real-time Activity Map zur Verfügung?",
      "options": [
        "Nur für Agenten mit aktivierter generativer Orchestrierung",
        "Für alle Agenten unabhängig von der Orchestrierung",
        "Nur für Agenten ohne Wissensquellen",
        "Nur für Agenten im Teams-Kanal"
      ],
      "correctIndex": 0,
      "explanation": "Die Activity Map steht nur für Agenten mit aktivierter generativer Orchestrierung zur Verfügung und zeigt Fehler sowie die Ausführungsdauer jedes Schritts.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity"
    },
    {
      "id": "q058",
      "domain": "d3",
      "sourceLearningItemId": "d3-011",
      "question": "Was ist bei der 'Rationale'-Funktion in der Activity-Ansicht zu beachten?",
      "options": [
        "Die Erklärung ist KI-generiert und kann ungenau sein",
        "Die Erklärung ist immer zu 100% korrekt",
        "Sie ist nur für abgeschlossene Topics verfügbar",
        "Sie zeigt ausschließlich Fehlercodes an"
      ],
      "correctIndex": 0,
      "explanation": "Die 'Rationale'-Funktion liefert eine KI-generierte Erklärung, warum ein Tool aufgerufen wurde; da sie KI-generiert ist, kann sie ungenau sein und sollte mit eigenem Urteilsvermögen bewertet werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity"
    },
    {
      "id": "q059",
      "domain": "d3",
      "sourceLearningItemId": "d3-013",
      "question": "Welche Kriterien bewertet die Evaluationsmethode 'General quality'?",
      "options": [
        "Relevance, Groundedness, Completeness und Abstention",
        "Nur Geschwindigkeit und Kosten",
        "Nur Rechtschreibung und Grammatik",
        "Nur die Anzahl verwendeter Tools"
      ],
      "correctIndex": 0,
      "explanation": "'General quality' nutzt ein LLM, um Relevance, Groundedness, Completeness und Abstention zu bewerten; sie benötigt keine erwarteten Antworten und wird standardmäßig bei jedem Testset verwendet.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
    },
    {
      "id": "q060",
      "domain": "d3",
      "sourceLearningItemId": "d3-015",
      "question": "Welche Testmethode prüft, ob bestimmte Schlüsselwörter in der Antwort enthalten sind?",
      "options": [
        "Keyword match",
        "Compare meaning",
        "Tool use",
        "Exact match"
      ],
      "correctIndex": 0,
      "explanation": "'Keyword match' prüft, ob bestimmte Schlüsselwörter enthalten sind (Modus 'Any' oder 'All'), während 'Compare meaning' die Bedeutung mit einer erwarteten Antwort vergleicht.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview"
    },
    {
      "id": "q061",
      "domain": "d3",
      "sourceLearningItemId": "d3-016",
      "question": "Wie viele Testfälle kann ein Single-Response-Testset maximal enthalten?",
      "options": [
        "Bis zu 100",
        "Bis zu 10",
        "Bis zu 20",
        "Unbegrenzt"
      ],
      "correctIndex": 0,
      "explanation": "Ein Testset für Single-Response-Evaluierungen besteht aus bis zu 100 Testfällen, die manuell, per Spreadsheet-Import oder per KI generiert werden können.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
    },
    {
      "id": "q062",
      "domain": "d3",
      "sourceLearningItemId": "d3-018",
      "question": "Wie lange sind Testergebnisse in Copilot Studio standardmäßig verfügbar?",
      "options": [
        "89 Tage",
        "7 Tage",
        "365 Tage",
        "Unbegrenzt"
      ],
      "correctIndex": 0,
      "explanation": "Testergebnisse sind in Copilot Studio 89 Tage lang verfügbar; für eine längere Aufbewahrung müssen sie als CSV exportiert werden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create"
    },
    {
      "id": "q063",
      "domain": "d3",
      "sourceLearningItemId": "d3-020",
      "question": "Was misst Agent Evaluation laut Dokumentation NICHT?",
      "options": [
        "KI-Ethik oder Sicherheitsprobleme",
        "Korrektheit der Antworten",
        "Performance des Agenten",
        "Qualität über die Weiterentwicklung hinweg"
      ],
      "correctIndex": 0,
      "explanation": "Agent Evaluation misst Korrektheit und Performance, nicht jedoch KI-Ethik oder Sicherheitsprobleme; verantwortungsvolle KI-Prüfungen ersetzen Evaluierungen daher nicht.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro"
    },
    {
      "id": "q064",
      "domain": "d3",
      "sourceLearningItemId": "d3-024",
      "question": "Wie viele Testfälle und Nachrichten unterstützt ein konversationelles Testset maximal?",
      "options": [
        "Bis zu 20 Testfälle mit je bis zu 12 Nachrichten (6 Frage-Antwort-Paare)",
        "Bis zu 100 Testfälle mit je 2 Nachrichten",
        "Bis zu 5 Testfälle mit unbegrenzten Nachrichten",
        "Bis zu 50 Testfälle mit je 4 Nachrichten"
      ],
      "correctIndex": 0,
      "explanation": "Ein Testset für konversationelle Evaluierungen unterstützt bis zu 20 Testfälle mit jeweils bis zu 12 Nachrichten (6 Frage-Antwort-Paare).",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-multi-turn"
    },
    {
      "id": "q065",
      "domain": "d3",
      "sourceLearningItemId": "d3-025",
      "question": "Welche Testmethode ist bei konversationellen Testsets NICHT verfügbar?",
      "options": [
        "Compare meaning",
        "General quality",
        "Keyword match",
        "Tool use"
      ],
      "correctIndex": 0,
      "explanation": "Für konversationelle Testsets sind nur 'General quality', 'Keyword match', 'Tool use' und 'Custom' verfügbar, nicht jedoch 'Compare meaning', 'Text similarity' oder 'Exact match'.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-multi-turn"
    },
    {
      "id": "q066",
      "domain": "d3",
      "sourceLearningItemId": "d3-026",
      "question": "Wofür sollten Managed Solutions verwendet werden?",
      "options": [
        "Für jede Umgebung, die keine Entwicklungsumgebung ist (Test, UAT, SIT, Produktion)",
        "Ausschließlich für Entwicklungsumgebungen",
        "Für die Versionskontrolle im Quellcode-System",
        "Nur für lokale Testzwecke von Makern"
      ],
      "correctIndex": 0,
      "explanation": "Managed Solutions werden in jede Umgebung bereitgestellt, die keine Entwicklungsumgebung ist, und sollten als Build-Artefakt betrachtet werden, das durch Export einer Unmanaged Solution erzeugt wird.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm"
    },
    {
      "id": "q067",
      "domain": "d3",
      "sourceLearningItemId": "d3-027",
      "question": "Was muss geschehen, bevor eine Komponente innerhalb einer Managed Solution bearbeitet werden kann?",
      "options": [
        "Sie muss zuerst einer Unmanaged Solution hinzugefügt werden",
        "Die Managed Solution muss exportiert werden",
        "Nichts, Managed-Komponenten sind direkt editierbar",
        "Der Tenant-Administrator muss die Solution neu installieren"
      ],
      "correctIndex": 0,
      "explanation": "Komponenten innerhalb einer Managed Solution können nicht direkt bearbeitet werden – sie müssen zuerst einer Unmanaged Solution hinzugefügt werden, was eine Abhängigkeit erzeugt.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm"
    },
    {
      "id": "q068",
      "domain": "d3",
      "sourceLearningItemId": "d3-030",
      "question": "Wofür sind Power Platform Pipelines laut Dokumentation gedacht?",
      "options": [
        "Um ALM-Automatisierung und CI/CD-Fähigkeiten für Maker, Admins und Entwickler zugänglich zu machen",
        "Um ausschließlich Backup-Aufgaben zu übernehmen",
        "Um Lizenzkosten zu senken",
        "Um Data Policies zu ersetzen"
      ],
      "correctIndex": 0,
      "explanation": "Power Platform Pipelines demokratisieren ALM, indem sie Automatisierung und CI/CD-Fähigkeiten für Maker, Admins und Entwickler zugänglich in den Dienst integrieren.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/pipeline"
    },
    {
      "id": "q069",
      "domain": "d3",
      "sourceLearningItemId": "d3-031",
      "question": "Was unterscheidet den 'Platform host' vom 'Custom host' bei Power Platform Pipelines?",
      "options": [
        "Platform host ist der tenant-weite Standardhost, den Maker konfigurieren können; Custom host wird von Admins für zentrale Steuerung konfiguriert",
        "Beide sind identisch und austauschbar",
        "Custom host ist nur für Testumgebungen vorgesehen",
        "Platform host erfordert immer eine separate Azure-Subscription"
      ],
      "correctIndex": 0,
      "explanation": "Der 'Platform host' ist der tenant-weite Standardhost, den Maker konfigurieren; der 'Custom host' wird von Admins konfiguriert, um citizen-led und pro-dev-led Projekte zentral zu steuern.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/alm/set-up-pipelines"
    },
    {
      "id": "q070",
      "domain": "d3",
      "sourceLearningItemId": "d3-034",
      "question": "Welcher PAC-CLI-Befehl startet ein Pipeline-Deployment?",
      "options": [
        "pac pipeline deploy",
        "pac solution import",
        "pac pipeline list",
        "pac install latest"
      ],
      "correctIndex": 0,
      "explanation": "'pac pipeline deploy' startet ein Pipeline-Deployment, während 'pac pipeline list' vorhandene Pipelines auflistet.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/pipeline"
    },
    {
      "id": "q071",
      "domain": "d3",
      "sourceLearningItemId": "d3-040",
      "question": "Wofür werden Connection References in einer Solution genutzt?",
      "options": [
        "Um Verbindungen unabhängig von der Umgebung zu referenzieren",
        "Um Umgebungsvariablen zu ersetzen",
        "Um Datentypen für Variablen festzulegen",
        "Um Testfälle zu speichern"
      ],
      "correctIndex": 0,
      "explanation": "Connection References ermöglichen es, dieselbe Solution in verschiedenen Umgebungen mit jeweils unterschiedlichen tatsächlichen Verbindungen zu verwenden.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-connection-reference"
    },
    {
      "id": "q072",
      "domain": "d3",
      "sourceLearningItemId": "d3-042",
      "question": "Welchen Datentyp wählt man bei einer Umgebungsvariable NICHT aus?",
      "options": [
        "Boolean Array",
        "Decimal number",
        "Text",
        "Secret"
      ],
      "correctIndex": 0,
      "explanation": "Beim manuellen Erstellen einer Umgebungsvariable wählt man einen Datentyp: Decimal number, Text, JSON, Two options, Data source oder Secret – 'Boolean Array' gehört nicht dazu.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables"
    },
    {
      "id": "q073",
      "domain": "d3",
      "sourceLearningItemId": "d3-047",
      "question": "Wie lange sind Analytics-Daten in Copilot Studio verfügbar, im Gegensatz zu Sitzungsdetails/Transkripten?",
      "options": [
        "Bis zu 360 Tage, während Transkripte nur 28 Tage verfügbar sind",
        "Beide 28 Tage",
        "Beide 360 Tage",
        "Analytics-Daten sind unbegrenzt verfügbar"
      ],
      "correctIndex": 0,
      "explanation": "Analytics-Daten sind bis zu 360 Tage verfügbar, während Sitzungsdetails und Transkripte nur für die letzten 28 Tage einsehbar sind; Zeitstempel sind in UTC.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-overview"
    },
    {
      "id": "q074",
      "domain": "d3",
      "sourceLearningItemId": "d3-048",
      "question": "Werden Testpanel-Interaktionen auf der Analytics-Seite von Copilot Studio angezeigt?",
      "options": [
        "Nein, Testpanel-Aktivität wird nicht in Analytics erfasst",
        "Ja, vollständig inklusive Transkripten",
        "Nur wenn generative Orchestrierung aktiv ist",
        "Nur für Admin-Konten"
      ],
      "correctIndex": 0,
      "explanation": "Die Analytics-Seite zeigt keine Analysen für Aktivitäten, die im Testpanel durchgeführt werden – produktive Analytics und Testpanel-Interaktionen sind getrennte Datenquellen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-overview"
    },
    {
      "id": "q075",
      "domain": "d3",
      "sourceLearningItemId": "d3-046",
      "question": "Welche Kennzahlen zeigt das vorgefertigte 'Copilot Studio Dashboard' in Application Insights?",
      "options": [
        "Gesamtzahl der Konversationen, Latenz, Exceptions, Tool-Nutzung und Topic-Analytics",
        "Nur Lizenzkosten",
        "Nur Fehlercodes ohne weitere Details",
        "Nur die Anzahl registrierter Nutzer"
      ],
      "correctIndex": 0,
      "explanation": "Das 'Copilot Studio Dashboard' führt Kennzahlen wie Gesamtzahl der Konversationen, Latenz, Exceptions, Tool-Nutzung und Topic-Analytics in einer einzigen Ansicht zusammen.",
      "msLearnUrl": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry"
    }
  ],
  "qaChecklist": [
    {
      "criterion": "Vollständige Domänenabdeckung (3 von 3 Prüfungsdomänen)",
      "method": "Manueller Abgleich mit offiziellem AB-620 Study Guide",
      "status": "bestanden",
      "details": "19 Unterthemen + 157 Lerninhalte + 20 verbundene Labs + 75 Prüfungsfragen decken alle 3 Domänengewichtungen ab (30-35% / 40-45% / 20-25%)."
    },
    {
      "criterion": "Prüfungsfragen-Mindestanzahl (≥ 20)",
      "method": "Automatisierte Zählung im examBank-Array",
      "status": "bestanden",
      "details": "75 Fragen im examBank vorhanden, verteilt auf alle drei Domänen."
    },
    {
      "criterion": "JavaScript-Syntaxvalidierung",
      "method": "node --check auf content.js und app.js",
      "status": "bestanden",
      "details": "Beide Dateien wurden mit Node.js Syntaxprüfung ohne Fehler validiert."
    },
    {
      "criterion": "Barrierefreiheit (WCAG 2.1 AA)",
      "method": "Manuelle Prüfung: Tastaturbedienbarkeit, Fokus-Sichtbarkeit, ARIA-Labels, Kontrastwerte",
      "status": "bestanden",
      "details": "Skip-Link, aria-live Region, sichtbare Fokusringe in allen 3 Themes, Radiogroup-Pattern für Quizfragen."
    },
    {
      "criterion": "Theme-Konsistenz (Hell/Dunkel/Hoher Kontrast)",
      "method": "Visuelle Prüfung aller Komponenten in allen 3 Themes",
      "status": "bestanden",
      "details": "Alle Farben über CSS Custom Properties gesteuert, Mindestkontrast 4.5:1 eingehalten."
    },
    {
      "criterion": "Mobile-First Responsiveness",
      "method": "Prüfung der Breakpoints < 600px, 600-1024px, > 1024px",
      "status": "bestanden",
      "details": "Sidebar klappt auf Mobilgeräten unter den Hauptinhalt, Akkordeons bleiben bedienbar."
    },
    {
      "criterion": "Funktionstest Prüfungssimulator",
      "method": "Manueller Durchlauf: Start, 20 Zufallsfragen, Timer, Auswertung",
      "status": "bestanden",
      "details": "Score-Berechnung auf 1000-Punkte-Skala mit 700-Punkte-Bestehensgrenze korrekt, Domänen-Aufschlüsselung vorhanden."
    }
  ]
};
