#!/usr/bin/env python3
"""
Microsoft Exam AB-620 Practice Exam Simulator
Topic: Designing and Implementing Microsoft AI Agents / Copilot Solutions & Multi-Agent Systems
Target Audience: Enterprise AI Architects & Engineers
Passing Score: 700 / 1000 (70%)
"""

import sys
import time
import random

# Color formatting for terminal
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

QUESTIONS = [
    {
        "id": 1,
        "domain": "Identity & SSO",
        "question": (
            "Ein Unternehmen implementiert einen benutzerdefinierten KI-Agenten in Microsoft Copilot Studio, "
            "der im Namen des angemeldeten Benutzers vertrauliche Microsoft Graph-Ressourcen abrufen soll (On-Behalf-Of / OBO Flow). "
            "Welche Konfiguration ist zwingend erforderlich, um Single Sign-On (SSO) und die Berechtigungsdelegierung über Microsoft Entra ID "
            "sicherzustellen, ohne dass Benutzerinteraktionen für jeden API-Aufruf wiederholt werden müssen?"
        ),
        "options": {
            "A": "Konfiguration eines Client Credentials Grant mit Anwendungsberechtigungen und globalem Admin-Consent im Entra ID Tenant.",
            "B": "Registrierung einer Microsoft Entra ID Multi-Tenant App, Konfiguration von 'expose an API' mit Application ID URI `api://botid-...`, Zuweisen von delegierten Rechten und Aktivierung von SSO in den Authentifizierungseinstellungen von Copilot Studio.",
            "C": "Verwendung eines Shared Access Signatures (SAS) Tokens, der bei der Benutzerinitialisierung an den Agenten übergeben wird.",
            "D": "Konfiguration der Microsoft Entra B2C Benutzerflow-Richtlinie mit Token-Cache auf Azure Blob Storage."
        },
        "correct": "B",
        "explanation": (
            "Für SSO und On-Behalf-Of (OBO) Workflows in Copilot Studio / Azure Bot Framework muss eine App Registration in Microsoft Entra ID "
            "erstellt werden. Die API muss exponiert werden (App ID URI nach dem Muster api://botid-{bot_app_id}), delegierte Berechtigungen für Graph APIs "
            "müssen konfiguriert und authorisiert sein. In Copilot Studio wird 'Authenticate with Microsoft' / SSO aktiviert."
        ),
        "link": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso"
    },
    {
        "id": 2,
        "domain": "Data Loss Prevention (DLP) & Governance",
        "question": (
            "Eine Organisation möchte verhindern, dass KI-Agenten in Microsoft Copilot Studio vertrauliche Finanzdaten "
            "über unautorisierte HTTP-Connectors oder Drittanbieter-Plugins an externe Cloud-Dienste exfiltrieren. "
            "Wie sollte die Sicherheitsarchitektur im Power Platform Admin Center und Microsoft Purview umgesetzt werden?"
        ),
        "options": {
            "A": "Erstellen einer Datenverlust-Verhinderungsrichtlinie (DLP) im Power Platform Admin Center, Verschieben von HTTP-/Drittanbieter-Connectors in die Gruppe 'Blockiert' oder 'Nicht-geschäftlich' und Anwenden von Microsoft Purview Sensitivity Labels auf Tenant-Ebene.",
            "B": "Deaktivieren von Copilot Studio für alle Benutzer über die Microsoft 365 Admin Center Lizenzverwaltung.",
            "C": "Einrichten einer Azure Firewall-Regel, die alle ausgehenden Requests auf Port 443 aus dem Copilot Studio IP-Bereich blockiert.",
            "D": "Erstellen einer Microsoft Defender for Endpoint Isolationsregel für Agent-Container."
        },
        "correct": "A",
        "explanation": (
            "Power Platform DLP-Richtlinien steuern, welche Connectors innerhalb einer Umgebung verwendet und miteinander kombiniert werden dürfen. "
            "Connectors können in 'Geschäftlich', 'Nicht-geschäftlich' oder 'Blockiert' eingestuft werden (keine Datenübertragung zwischen geschäftlich "
            "und nicht-geschäftlich). Microsoft Purview Sensitivity Labels ergänzen den Schutz durch Verschlüsselung und Zugriffsrichtlinien für vertrauliche Inhalte."
        ),
        "link": "https://learn.microsoft.com/en-us/power-platform/admin/prevent-data-loss-copilot-studio"
    },
    {
        "id": 3,
        "domain": "Model Context Protocol (MCP)",
        "question": (
            "Sie entwerfen eine modulare Agenten-Architektur, bei der lokale und Cloud-basierte Werkzeuge (Tools/Resources/Prompts) "
            "über das Model Context Protocol (MCP) für einen KI-Agenten bereitgestellt werden. "
            "Welche Aussage beschreibt die Sicherheits- und Kommunikationsmechanismen von MCP (Client/Server) korrekt?"
        ),
        "options": {
            "A": "MCP unterstützt ausschließlich unverschlüsselte UDP-Sockets und erfordert Root-Rechte auf dem Host.",
            "B": "MCP verwendet standardisierte Transport-Protokolle wie stdio (für lokale Prozess-Isolation) und SSE (Server-Sent Events / HTTP) für Remote-Dienste mit JSON-RPC 2.0 Nachrichtenaustausch und Capability-Negotiation beim Verbindungsaufbau.",
            "C": "MCP erzwingt die Ausführung aller Tool-Aufrufe direkt im LLM-Kernel ohne Host-Validierung.",
            "D": "MCP ersetzt Microsoft Entra ID vollständig durch clientseitige symmetrische AES-256 Tokens ohne Server-Authentifizierung."
        },
        "correct": "B",
        "explanation": (
            "Das Model Context Protocol (MCP) basiert auf JSON-RPC 2.0 und definiert Client/Server-Interaktionen über standardisierte Transporte: "
            "`stdio` für lokale Subprozesse mit starker Prozessisolation sowie `SSE` (Server-Sent Events) über HTTP/HTTPS für Remote-Verbindungen. "
            "Beim Handshake erfolgt eine Capability Negotiation (Tools, Resources, Prompts)."
        ),
        "link": "https://learn.microsoft.com/en-us/azure/ai-services/agents/overview"
    },
    {
        "id": 4,
        "domain": "Multi-Agent Systems & A2A Orchestration",
        "question": (
            "In einem komplexen Kundenservice-Szenario müssen mehrere spezialisierte Agenten (Triage Agent, Billing Agent, Technical Support Agent) "
            "zusammenarbeiten. Ein Orchestrator-Agent delegiert Anfragen dynamisch und synchronisiert Teilantworten. "
            "Welches Entwurfsmuster und Azure/Semantic Kernel Konstrukt eignet sich am besten für diese Multi-Agent Agent-to-Agent (A2A) Koordination?"
        ),
        "options": {
            "A": "Single-Threaded Prompt Chaining ohne State Management.",
            "B": "Semantic Kernel Agent Framework / AutoGen mit GroupChat/Hierarchical Orchestrator Pattern, wobei Agenten über klar definierte Persona-Instruktionen, Tool-Definitions und Übergabekriterien (Termination & Selection Strategies) gesteuert werden.",
            "C": "Direktes Schreiben aller Zwischenschritte in eine relationale Azure SQL-Tabelle via Triggern ohne LLM-Beteiligung.",
            "D": "Monolithischer System Prompt mit 500.000 Tokens, der alle Rollen gleichzeitig ohne Agenten-Trennung simuliert."
        },
        "correct": "B",
        "explanation": (
            "Für robuste Multi-Agenten-Systeme bietet das Semantic Kernel Agent Framework bzw. Azure AI Agent Service standardisierte Orchestrierungsmuster wie "
            "AgentGroupChat, Hierarchical / Supervisor Pattern oder Round-Robin. Spezialisierte Agenten agieren autonom mit eigenen Tools und State, während "
            "Selection- und TerminationStrategies die Gesprächsübergabe und den Abschluss steuern."
        ),
        "link": "https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/"
    },
    {
        "id": 5,
        "domain": "Azure AI Search & Hybrid RAG",
        "question": (
            "Ihr RAG-basierter Agent muss hochpräzise Antworten über Millionen technischer Dokumente liefern. "
            "Sie möchten Keyword-Präzision für Produkt-IDs (z.B. 'XF-902-REV3') mit semantischem Verständnis für natürlichsprachige Fragen kombinieren "
            "und Halluzinationen minimieren. Welche Konfiguration in Azure AI Search ist die empfohlene Best Practice?"
        ),
        "options": {
            "A": "Ausschließlich Exact Keyword Match über Standard-Lucene-Index.",
            "B": "Reines Dense Vector Search mit Cosine Similarity ohne Text-Filterung.",
            "C": "Hybrid Search (Vektorsuche + BM25 Volltextsuche) kombiniert mit Reciprocal Rank Fusion (RRF) und Semantic Ranker (L2 Re-ranking).",
            "D": "Reguläre Ausdrücke (Regex) kombiniert mit Fuzzy Matching auf Azure Cosmos DB."
        },
        "correct": "C",
        "explanation": (
            "Microsoft Azure AI Search Best Practice für RAG ist Hybrid Search: Die Kombination aus Dense Vector Search (semantische Ähnlichkeit) "
            "und Keyword Search (BM25 für IDs, exakte Begriffe), fusioniert via Reciprocal Rank Fusion (RRF) und verfeinert durch den Semantic Ranker (Deep Learning Re-Ranking)."
        ),
        "link": "https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview"
    },
    {
        "id": 6,
        "domain": "Fabric Data Agents & Copilot",
        "question": (
            "Ein Fabric Data Agent soll Datenanalysten ermöglichen, Geschäftsfragen in natürlicher Sprache über ein Microsoft Fabric OneLake Lakehouse "
            "zu stellen, SQL/DAX-Abfragen zu generieren und aggregierte Kennzahlen sicher zurückzuliefern. "
            "Wie wird sichergestellt, dass der Agent die OneLake-Sicherheitsgrenzen (Direct Lake / RLS / CLS) respektiert?"
        ),
        "options": {
            "A": "Der Fabric Data Agent nutzt das User Delegation Token (Entra ID Identität des Abfragenden), sodass OneLake Row-Level Security (RLS) und Column-Level Security (CLS) im semantischen Modell automatisch greifen.",
            "B": "Der Agent verwendet einen fest verdrahteten Master-Service-Principal mit Tenant-Admin-Rechten und ignoriert Benutzerberechtigungen.",
            "C": "Alle Daten werden vorab unverschlüsselt in den Prompt-Cache des Agenten exportiert.",
            "D": "RLS wird clientseitig durch String-Filterung im generierten Python-Code simuliert."
        },
        "correct": "A",
        "explanation": (
            "Microsoft Fabric Data Agents und Copilot in Fabric arbeiten im Sicherheitskontext des authentifizierten Benutzers. "
            "Über Microsoft Entra ID Token Delegation werden Berechtigungen, Row-Level Security (RLS), Column-Level Security (CLS) und "
            "OneLake Data Access Policies nativ auf Engine-Ebene durchgesetzt."
        ),
        "link": "https://learn.microsoft.com/en-us/fabric/data-science/copilot-fabric-overview"
    },
    {
        "id": 7,
        "domain": "Application Lifecycle Management (ALM)",
        "question": (
            "Sie verwalten Copilot Studio Agenten und Azure AI Komponenten über mehrere Umgebungen hinweg (Dev, Test, Prod). "
            "Welche ALM-Strategie entspricht den Microsoft Recommended Practices für automatisierte Deployments?"
        ),
        "options": {
            "A": "Manuelles Kopieren von XML-Dateien über das Webportal am Freitagnachmittag.",
            "B": "Verwendung von Power Platform Managed Solutions, Umgebungsvariablen für verbindungsspezifische Endpunkte, Connection References für Authentifizierungen und automatisierten Azure DevOps / GitHub Actions CI/CD Pipelines mit Power Platform CLI (pac).",
            "C": "Direktes Bearbeiten der Agent-Definitionen in der Produktionsumgebung durch alle Entwickler.",
            "D": "Exportieren als Unmanaged Solution und permanentes Belassen im Quellcode-Repository ohne Build-Pipeline."
        },
        "correct": "B",
        "explanation": (
            "In professionellen Enterprise-Umgebungen werden Power Platform / Copilot Studio Komponenten als Managed Solutions ausgeliefert. "
            "Umgebungsspezifische Konfigurationen (URLs, IDs) werden über Environment Variables gesteuert, Connectors über Connection References. "
            "Pipelines (Azure DevOps / GitHub Actions) nutzen die Power Platform CLI (`pac CLI`) für automatisierte Builds, Tests und Release-Promotions."
        ),
        "link": "https://learn.microsoft.com/en-us/power-platform/alm/overview-alm"
    },
    {
        "id": 8,
        "domain": "Testing, Groundedness & Evaluation",
        "question": (
            "Zur Qualitätssicherung eines Azure AI Agenten soll eine automatisierte Evaluierungs-Pipeline aufgesetzt werden. "
            "Welche Metriken und Tools aus dem Azure AI Evaluation SDK sollten eingesetzt werden, um Halluzinationen und Faktenbezug zu messen?"
        ),
        "options": {
            "A": "Ausschließlich Zählen der Antwortlänge (Character Count) und HTTP Status 200 Checks.",
            "B": "Groundedness (Faktenbezug zum Context), Relevance (Relevanz zur Benutzerfrage), Coherence, Fluency sowie Safety-Evaluators (Hate, Violence, Self-harm) unter Verwendung von Azure AI Evaluation SDK mit Ground Truth Datensätzen.",
            "C": "Prüfen, ob das generierte JSON syntaktisch mit YAML kompatibel ist.",
            "D": "Messung der GPU-Temperatur während des Inferenz-Vorgangs."
        },
        "correct": "B",
        "explanation": (
            "Das Azure AI Evaluation SDK (Teil von Azure AI Foundry / Azure OpenAI) bietet vorgefertigte Evaluators: Groundedness (prüft, ob Fakten aus dem Retriever-Kontext stammen), "
            "Relevance (Beantwortung der Intention), Coherence, Similarity (Vergleich mit Ground Truth) sowie Safety-Metriken für Enterprise-Compliance."
        ),
        "link": "https://learn.microsoft.com/en-us/azure/ai-studio/concepts/evaluation-metrics-built-in"
    },
    {
        "id": 9,
        "domain": "Identity & Permissions",
        "question": (
            "Ein Azure AI Agent Service benötigt Zugriff auf eine Azure Cosmos DB und Azure OpenAI Service Instanz, "
            "ohne dass Verbindungszeichenfolgen (Connection Strings) oder statische API-Keys im Quellcode oder in Umgebungsvariablen gespeichert werden. "
            "Welche Authentifizierungsmethode ist nach Zero-Trust-Prinzipien zu implementieren?"
        ),
        "options": {
            "A": "Speichern von API-Keys in einer öffentlich zugänglichen GitHub-Konfigurationsdatei.",
            "B": "System-assigned oder User-assigned Managed Identity (Verwaltete Identität) mit Azure RBAC Rollenzuweisungen (z.B. 'Cognitive Services OpenAI User' und 'Cosmos DB Built-in Data Contributor').",
            "C": "Verwendung eines statischen Root-Passworts, das per Base64 kodiert wird.",
            "D": "Aktivieren des anonymen Zugriffs für alle Azure-Ressourcen innerhalb der Subscription."
        },
        "correct": "B",
        "explanation": (
            "Azure Managed Identities eliminieren die Notwendigkeit von statischen Geheimnissen im Code. Die Identität wird von Microsoft Entra ID "
            "automatisch verwaltet und rotiert. Über Azure Role-Based Access Control (RBAC) werden dem Agenten exakt die minimal benötigten Rollen zugewiesen."
        ),
        "link": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
    },
    {
        "id": 10,
        "domain": "Prompt Engineering & Security",
        "question": (
            "Ihr Agent verarbeitet unstrukturierte Benutzereingaben und Dokumente aus dem Web. "
            "Wie schützen Sie das System wirksam gegen 'Indirect Prompt Injection' und Jailbreak-Angriffe?"
        ),
        "options": {
            "A": "Vollständiges Deaktivieren von System-Prompts.",
            "B": "Implementierung von Azure AI Content Safety (Prompt Shields, Jailbreak Detection), klare syntaktische Trennung von System-Instruktionen und unvertrauenswürdigen Datenkontexten (z.B. XML/Delimiters) sowie Least-Privilege Tool Execution.",
            "C": "Ausschließliche Verwendung von Regex-Filtern für das Wort 'ignore'.",
            "D": "Konvertierung aller Eingaben in Großbuchstaben vor der Übergabe an das Modell."
        },
        "correct": "B",
        "explanation": (
            "Gegen Direct und Indirect Prompt Injections empfiehlt Microsoft eine Defense-in-Depth Strategie: Azure AI Content Safety Prompt Shields "
            "(erkennt Angriffe in Nutzer- und Drittanbieterinhalten), strukturierte Delimiter im System Prompt, und strikte Least-Privilege Prinzipien für Tool- und API-Aufrufe."
        ),
        "link": "https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection"
    }
]

def clear_screen():
    print("\n" + "="*80 + "\n")

def run_exam(test_answers=None, shuffle=False):
    """
    Runs the exam simulator.
    If test_answers list is provided, simulates user input for automated testing.
    """
    print(f"{Colors.HEADER}{Colors.BOLD}================================================================================{Colors.END}")
    print(f"{Colors.CYAN}{Colors.BOLD}     MICROSOFT CERTIFICATION EXAM SIMULATOR: EXAM AB-620                   {Colors.END}")
    print(f"{Colors.BLUE}     Designing & Implementing Microsoft AI Agents and Copilot Solutions       {Colors.END}")
    print(f"{Colors.HEADER}{Colors.BOLD}================================================================================{Colors.END}")
    print(f"Anzahl Fragen: {len(QUESTIONS)}")
    print(f"Bestehensgrenze: 700 / 1000 Punkte (70%)")
    print(f"Domänen: Identity/SSO, DLP, MCP, Multi-Agent A2A, AI Search, Fabric, ALM, Testing\n")

    if not test_answers:
        try:
            input(f"{Colors.YELLOW}Drücken Sie [ENTER], um die Prüfung zu starten...{Colors.END}")
        except EOFError:
            pass

    score = 0
    results = []
    
    questions_pool = list(QUESTIONS)
    if shuffle:
        random.shuffle(questions_pool)

    for idx, q in enumerate(questions_pool, 1):
        clear_screen()
        print(f"{Colors.BOLD}Frage {idx} von {len(questions_pool)} [Domäne: {Colors.CYAN}{q['domain']}{Colors.END}{Colors.BOLD}]{Colors.END}")
        print("-" * 80)
        print(f"{q['question']}\n")

        for key, opt in sorted(q['options'].items()):
            print(f"  {Colors.BOLD}({key}){Colors.END} {opt}")
        print()

        user_choice = None
        while True:
            if test_answers and len(test_answers) >= idx:
                raw_input = test_answers[idx - 1]
                print(f"{Colors.YELLOW}Ihre Antwort (A/B/C/D): {raw_input}{Colors.END}")
            else:
                try:
                    raw_input = input(f"{Colors.YELLOW}Ihre Antwort (A/B/C/D): {Colors.END}").strip().upper()
                except EOFError:
                    raw_input = "B"

            if raw_input in ["A", "B", "C", "D"]:
                user_choice = raw_input
                break
            else:
                print(f"{Colors.RED}Ungültige Eingabe! Bitte wählen Sie A, B, C oder D.{Colors.END}")

        is_correct = (user_choice == q['correct'])
        if is_correct:
            score += 1
            print(f"\n{Colors.GREEN}{Colors.BOLD}✓ RICHTIG!{Colors.END}")
        else:
            print(f"\n{Colors.RED}{Colors.BOLD}✗ FALSCH!{Colors.END} Richtige Antwort: ({q['correct']})")

        print(f"\n{Colors.BOLD}Erklärung:{Colors.END} {q['explanation']}")
        print(f"{Colors.BLUE}{Colors.UNDERLINE}Microsoft Learn Referenz:{Colors.END} {q['link']}")
        
        results.append({
            "num": idx,
            "id": q['id'],
            "domain": q['domain'],
            "user": user_choice,
            "correct": q['correct'],
            "is_correct": is_correct
        })

        if not test_answers:
            try:
                input(f"\n{Colors.YELLOW}[ENTER] für die nächste Frage...{Colors.END}")
            except EOFError:
                pass

    # Final Score Report
    clear_screen()
    percentage = (score / len(questions_pool)) * 100
    scaled_score = int((score / len(questions_pool)) * 1000)
    passed = scaled_score >= 700

    print(f"{Colors.HEADER}{Colors.BOLD}================================================================================{Colors.END}")
    print(f"{Colors.CYAN}{Colors.BOLD}                         AB-620 EXAM SCORE REPORT                               {Colors.END}")
    print(f"{Colors.HEADER}{Colors.BOLD}================================================================================{Colors.END}\n")

    print(f"Gesamtpunktzahl:  {score} von {len(questions_pool)} ({percentage:.1f}%)")
    print(f"Skalierter Score: {scaled_score} / 1000")
    print(f"Bestehensmarke:   700 / 1000")
    
    if passed:
        print(f"Status:           {Colors.GREEN}{Colors.BOLD}BESTANDEN (PASSED){Colors.END} 🎉\n")
    else:
        print(f"Status:           {Colors.RED}{Colors.BOLD}NICHT BESTANDEN (FAILED){Colors.END} ⚠️\n")

    print(f"{Colors.BOLD}Ergebnisse nach Domänen:{Colors.END}")
    print("-" * 80)
    
    # Calculate domain performance
    domains = {}
    for r in results:
        d = r['domain']
        if d not in domains:
            domains[d] = {"correct": 0, "total": 0}
        domains[d]["total"] += 1
        if r['is_correct']:
            domains[d]["correct"] += 1

    for d, stats in sorted(domains.items()):
        dom_pct = (stats['correct'] / stats['total']) * 100
        bar = "█" * int(dom_pct // 10) + "░" * (10 - int(dom_pct // 10))
        status_color = Colors.GREEN if dom_pct >= 70 else Colors.RED
        print(f"{d:<35} [{bar}] {stats['correct']}/{stats['total']} ({status_color}{dom_pct:>5.1f}%{Colors.END})")

    print("-" * 80)
    print(f"\n{Colors.BOLD}Detaillierte Fragenübersicht:{Colors.END}")
    for r in results:
        marker = f"{Colors.GREEN}RICHTIG{Colors.END}" if r['is_correct'] else f"{Colors.RED}FALSCH {Colors.END}"
        print(f"  Frage {r['num']:>2} [{r['domain']:<30}]: {marker} (Ihre Wahl: {r['user']}, Richtig: {r['correct']})")

    print(f"\n{Colors.HEADER}================================================================================{Colors.END}\n")
    return passed, scaled_score

if __name__ == "__main__":
    if "--test-pass" in sys.argv:
        # Automatisierter Testlauf: Alle Fragen mit korrekter Antwort
        test_answers = [q['correct'] for q in QUESTIONS]
        passed, score = run_exam(test_answers=test_answers)
        sys.exit(0 if (passed and score == 1000) else 1)
    elif "--test-fail" in sys.argv:
        # Automatisierter Testlauf: Alle Antworten falsch (z.B. 'D' für alle, wobei korrekte != 'D' ist)
        test_answers = ["D" if q['correct'] != "D" else "A" for q in QUESTIONS]
        passed, score = run_exam(test_answers=test_answers)
        sys.exit(0 if (not passed and score < 700) else 1)
    else:
        run_exam()
