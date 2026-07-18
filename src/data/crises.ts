import { Crisis } from '../types';

export const crisesList: Crisis[] = Object.freeze([
  Object.freeze({
    id: 'nom_001',
    title: 'NORMAL OPERATIONS',
    severity: 'Nominal',
    description: 'MetLife Stadium operating under standard FIFA 2026 tournament conditions.',
    targetSector: 'None',
    dangerIndex: 4,
    confidenceScore: 99,
    sensorLogs: Object.freeze([
      'SYSTEM: MetLife Stadium Smart Nodes reporting online (4,250 devices connected).',
      'SENSOR: Air quality PM2.5 at 12 µg/m³ (Optimal / Safe Air Index).',
      'INFRA: Power grid operating at 98.4% efficiency with hydrogen cell backup standby.',
      'SENSOR: Turnstiles reporting average processing time of 3.4 seconds per fan.'
    ]),
    aiReasoning: 'All security nodes, transit relays, and environmental sensors are operating within optimal parameters under FIFA 2026 Stadium Safety Regulation Article 4. Crowd kinetics show smooth laminar flows across all stadium zones. No current anomalies detected.',
    directives: Object.freeze([
      'PROTOCOL compliance: Maintain standard automated monitoring in accordance with FIFA Safety Guidelines Chapter 5.',
      'OPTIMIZE transit flows: Sync arrival frequencies with the Secaucus Junction rail coordinator to prevent concourse bottlenecks.',
      'STAFF briefing: Review safety checkpoint status maps with volunteer coordinators and local Bergen County emergency responders.'
    ]),
    translations: Object.freeze({
      en: 'Welcome to MetLife Stadium for the FIFA World Cup 2026. Enjoy the match, adhere to security regulations, and keep walkways clear.',
      es: 'Bienvenidos al Estadio MetLife para la Copa Mundial de la FIFA 2026. Disfruten del partido, cumplan con las normas de seguridad y dejen libres los pasillos.',
      fr: 'Bienvenue au MetLife Stadium pour la Coupe du Monde de la FIFA 2026. Bon match, respectez les consignes de sécurité et gardez les passages libres.'
    }),
    metricOverrides: Object.freeze({
      attendance: '82,410',
      temperature: '72°F',
      statusRating: 'OPTIMAL',
      incidentCount: 0
    }),
    track: 'Core System Readiness'
  }),
  Object.freeze({
    id: 'gate_surge',
    title: 'GATE 4 SURGE & ACCESS FAILURE',
    severity: 'Critical',
    description: 'Localized turnstile failure causes dangerous crowd bottleneck at Gate 4 (East Stand) under FIFA egress protocols.',
    targetSector: 'East',
    dangerIndex: 88,
    confidenceScore: 94,
    sensorLogs: Object.freeze([
      'ALERT: Turnstile bank E1-E8 offline due to localized network switch timeout.',
      'SENSOR: Crowd density at Gate 4 perimeter exceeds 4.8 persons/m² (Critical threshold: 3.5).',
      'AUDIO: Decibel spikes (+18dB) detected; localized crowd distress signatures identified.',
      'INFRA: Gate 4 structural barriers experiencing extreme load of 140kg/m.'
    ]),
    aiReasoning: 'Critical bottleneck detected at Gate 4, breaching FIFA Safety Regulation Article 12.3 (maximum crowd density standards). Localized hardware failure halted entry flows while incoming passenger streams from NJ Transit shuttle lines continued to pile up. High probability of crowd-crush or stampede in Sector East within 4.5 minutes if pressure is not vented.',
    directives: Object.freeze([
      'REROUTE flows: Reroute incoming Sector East flows to Gate 5 immediately using electronic signage, coordinating with NJ Transit supervisors.',
      'DEPLOY cordons: Deploy Response Team Bravo (12 officers) to establish physical filter cordons 50 meters upstream under local emergency responder protocols.',
      'VENT pressure: Activate manual overrides on Gate 4 emergency exit doors to vent crowd pressure into the inner concourse immediately.'
    ]),
    translations: Object.freeze({
      en: 'Attention all spectators near Gate 4. In compliance with stadium safety procedures, please proceed to Gate 5 on the East-North side. Staff are waiting to assist you.',
      es: 'Atención a todos los espectadores cerca de la Puerta 4. En cumplimiento de los protocolos de seguridad, diríjanse a la Puerta 5 en el noreste. El personal le ayudará.',
      fr: 'Attention à tous les spectateurs près de la Porte 4. Conformément aux règles de sécurité, veuillez vous diriger vers la Porte 5 du côté nord-est.'
    }),
    metricOverrides: Object.freeze({
      attendance: '82,104',
      temperature: '72°F',
      statusRating: 'CRITICAL',
      incidentCount: 1
    }),
    track: 'Track 1: Dynamic Crowd Management'
  }),
  Object.freeze({
    id: 'sensory_navigation',
    title: 'SECTION 102 ACCESSIBILITY REROUTING',
    severity: 'High',
    description: 'Acoustic levels in Section 102 (South Stand) trigger high-sensory alarms, initiating smart indoor navigation detours.',
    targetSector: 'South',
    dangerIndex: 65,
    confidenceScore: 96,
    sensorLogs: Object.freeze([
      'ALERT: Acoustic decibel threshold exceeded (104 dB) near South Stand Section 102 boundary.',
      'SENSOR: Real-time indoor location nodes identify 42 neurodivergent and disabled spectators in Section 102.',
      'WAYFINDING: Digital signage network activated for automated accessibility routing guidance.',
      'INFRA: Accessibility elevator S-Elevator-2 reporting nominal ready state.'
    ]),
    aiReasoning: 'Acoustic spike in Section 102 triggers dynamic accessibility and smart indoor navigation protocols in compliance with FIFA Accessibility Standard Section 9. High sound levels present sensory risk for neurodivergent and vulnerable fans. Rerouting pathways must be set to guide spectators safely through designated quiet-corridors.',
    directives: Object.freeze([
      'REROUTE path: Activate dynamic green-lit wayfinding sign arrays in South Concourse, guiding spectators to the Low-Acoustic Corridor S1B.',
      'DEPLOY assistance: Deploy Accessibility Marshals with sound-dampening ear defenders and sensory assistance packs directly to Section 102.',
      'ACTIVATE quiet-zone: Trigger HVAC and soft-lighting presets in adjacent Level 1 Sensory Sanctuary Room to accommodate transition guests.'
    ]),
    translations: Object.freeze({
      en: 'Accessibility alert for Section 102. For a low-sensory exit route or noise-dampening gear, please follow the green light paths toward Corridor S1B.',
      es: 'Alerta de accesibilidad en la Sección 102. Para una ruta con bajo nivel de ruido o equipos de atenuación sonora, siga las luces verdes hacia el Pasillo S1B.',
      fr: 'Alerte d\'accessibilité pour la Section 102. Pour un itinéraire à faible niveau de bruit, veuillez suivre le balisage vert vers le Couloir S1B.'
    }),
    metricOverrides: Object.freeze({
      attendance: '81,950',
      temperature: '72°F',
      statusRating: 'ACCESSIBILITY ACTIVE',
      incidentCount: 1
    }),
    track: 'Track 2: Smart Indoor Navigation & Accessibility'
  }),
  Object.freeze({
    id: 'transit_blockade',
    title: 'WEST METROLINK TRANSIT BLOCKADE',
    severity: 'High',
    description: 'Power rail failure on West Metrolink stalls inbound train, triggering FIFA Chapter 8 emergency transit plan.',
    targetSector: 'West',
    dangerIndex: 72,
    confidenceScore: 89,
    sensorLogs: Object.freeze([
      'TELEMETRY: Train #WC-2026-W halted 400m outside West Transit Hub due to power rail failure.',
      'SENSOR: 18,500 outbound passengers backlogged in West Terminal queuing plazas.',
      'CCTV: Ingress congestion at West Plaza stalling emergency vehicle access lanes.',
      'COORD: New Jersey Transit authorities report a 45-minute minimum electrical repair window.'
    ]),
    aiReasoning: 'Transit bottleneck at West Terminal. Heavy queue backup is overflowing into emergency vehicle corridors and West Stand plazas, violating FIFA safety evacuation zone integrity. Transit failure demands immediate activation of carbon-offset bus bridges to maintain sustainability goals.',
    directives: Object.freeze([
      'BUS bridging: Activate the fleet of 25 zero-emission electric shuttle buses from Lot G to Secaucus Junction to maintain transit throughput.',
      'GREEN dispatch: Sync with the regional smart-grid dispatch to leverage off-grid solar-battery storage at the MetLife west terminal charging depot.',
      'COMMUNICATE delay: Distribute dynamic digital transit alerts on the FIFA 2026 app, directing travelers to low-carbon shuttle lanes.'
    ]),
    translations: Object.freeze({
      en: 'Due to a transit disruption on the West Metrolink, please use the free shuttle buses operating from Lot G to Secaucus Junction. Follow staff directions.',
      es: 'Debido a una interrupción de tránsito, utilice los autobuses de enlace gratuitos desde el Lote G hacia Secaucus Junction. Siga las indicaciones.',
      fr: 'En raison d\'une interruption de transport, veuillez utiliser les navettes gratuites depuis le parking G vers Secaucus Junction.'
    }),
    metricOverrides: Object.freeze({
      attendance: '79,940',
      temperature: '71°F',
      statusRating: 'DEGRADED',
      incidentCount: 1
    }),
    track: 'Track 3: Tournament Sustainability & Transport'
  })
]) as unknown as Crisis[];
