import { Crisis } from '../types';

export const crisesList: Crisis[] = [
  {
    id: 'nom_001',
    title: 'NORMAL OPERATIONS',
    severity: 'Nominal',
    description: 'MetLife Stadium operating under standard FIFA 2026 tournament conditions.',
    targetSector: 'None',
    dangerIndex: 4,
    confidenceScore: 99,
    sensorLogs: [
      'SYSTEM: MetLife Stadium Smart Nodes reporting online (4,250 devices connected).',
      'SENSOR: Air quality PM2.5 at 12 µg/m³ (Optimal / Safe Air Index).',
      'INFRA: Power grid operating at 98.4% efficiency with hydrogen cell backup standby.',
      'SENSOR: Turnstiles reporting average processing time of 3.4 seconds per fan.'
    ],
    aiReasoning: 'All security nodes, transit relays, and environmental sensors are operating within optimal parameters under FIFA 2026 Stadium Safety Regulation Article 4. Crowd kinetics show smooth laminar flows across all stadium zones. No current anomalies detected.',
    directives: [
      'PROTOCOL compliance: Maintain standard automated monitoring in accordance with FIFA Safety Guidelines Chapter 5.',
      'OPTIMIZE transit flows: Sync arrival frequencies with the Secaucus Junction rail coordinator to prevent concourse bottlenecks.',
      'STAFF briefing: Review safety checkpoint status maps with volunteer coordinators and local Bergen County emergency responders.'
    ],
    translations: {
      en: 'Welcome to MetLife Stadium for the FIFA World Cup 2026. Enjoy the match, adhere to security regulations, and keep walkways clear.',
      es: 'Bienvenidos al Estadio MetLife para la Copa Mundial de la FIFA 2026. Disfruten del partido, cumplan con las normas de seguridad y dejen libres los pasillos.',
      fr: 'Bienvenue au MetLife Stadium pour la Coupe du Monde de la FIFA 2026. Bon match, respectez les consignes de sécurité et gardez les passages libres.'
    },
    metricOverrides: {
      attendance: '82,410',
      temperature: '72°F',
      statusRating: 'OPTIMAL',
      incidentCount: 0
    }
  },
  {
    id: 'gate_surge',
    title: 'GATE 4 SURGE & ACCESS FAILURE',
    severity: 'Critical',
    description: 'Localized turnstile failure causes dangerous crowd bottleneck at Gate 4 (East Stand) under FIFA egress protocols.',
    targetSector: 'East',
    dangerIndex: 88,
    confidenceScore: 94,
    sensorLogs: [
      'ALERT: Turnstile bank E1-E8 offline due to localized network switch timeout.',
      'SENSOR: Crowd density at Gate 4 perimeter exceeds 4.8 persons/m² (Critical threshold: 3.5).',
      'AUDIO: Decibel spikes (+18dB) detected; localized crowd distress signatures identified.',
      'INFRA: Gate 4 structural barriers experiencing extreme load of 140kg/m.'
    ],
    aiReasoning: 'Critical bottleneck detected at Gate 4, breaching FIFA Safety Regulation Article 12.3 (maximum crowd density standards). Localized hardware failure halted entry flows while incoming passenger streams from NJ Transit shuttle lines continued to pile up. High probability of crowd-crush or stampede in Sector East within 4.5 minutes if pressure is not vented.',
    directives: [
      'REROUTE flows: Reroute incoming Sector East flows to Gate 5 immediately using electronic signage, coordinating with NJ Transit supervisors.',
      'DEPLOY cordons: Deploy Response Team Bravo (12 officers) to establish physical filter cordons 50 meters upstream under local emergency responder protocols.',
      'VENT pressure: Activate manual overrides on Gate 4 emergency exit doors to vent crowd pressure into the inner concourse immediately.'
    ],
    translations: {
      en: 'Attention all spectators near Gate 4. In compliance with stadium safety procedures, please proceed to Gate 5 on the East-North side. Staff are waiting to assist you.',
      es: 'Atención a todos los espectadores cerca de la Puerta 4. En cumplimiento de los protocolos de seguridad, diríjanse a la Puerta 5 en el noreste. El personal le ayudará.',
      fr: 'Attention à tous les spectateurs près de la Porte 4. Conformément aux règles de sécurité, veuillez vous diriger vers la Porte 5 du côté nord-est.'
    },
    metricOverrides: {
      attendance: '82,104',
      temperature: '72°F',
      statusRating: 'CRITICAL',
      incidentCount: 1
    }
  },
  {
    id: 'transit_blockade',
    title: 'WEST METROLINK TRANSIT BLOCKADE',
    severity: 'High',
    description: 'Power rail failure on West Metrolink stalls inbound train, triggering FIFA Chapter 8 emergency transit plan.',
    targetSector: 'West',
    dangerIndex: 72,
    confidenceScore: 89,
    sensorLogs: [
      'TELEMETRY: Train #WC-2026-W halted 400m outside West Transit Hub due to power rail failure.',
      'SENSOR: 18,500 outbound passengers backlogged in West Terminal queuing plazas.',
      'CCTV: Ingress congestion at West Plaza stalling emergency vehicle access lanes.',
      'COORD: New Jersey Transit authorities report a 45-minute minimum electrical repair window.'
    ],
    aiReasoning: 'Transit bottleneck at West Terminal. Heavy queue backup is overflowing into emergency vehicle corridors and West Stand plazas, violating FIFA safety evacuation zone integrity. Crowd mood is stable but density is high, impeding potential ambulance egress route.',
    directives: [
      'BUS bridging: Activate the pre-arranged emergency transit bus line (Route Red, 25 high-capacity buses) from Lot G to Secaucus Junction.',
      'SECURE corridor: Enforce emergency vehicle cordon C-3 in coordination with local police; redirect non-essential traffic away from the West Arena.',
      'FAN notification: Deploy bilingual volunteer marshals with high-volume megaphones to West Plaza to guide spectators to alternate transit nodes.'
    ],
    translations: {
      en: 'Due to a transit disruption on the West Metrolink, please use the free shuttle buses operating from Lot G to Secaucus Junction. Follow staff directions.',
      es: 'Debido a una interrupción de tránsito, utilice los autobuses de enlace gratuitos desde el Lote G hacia Secaucus Junction. Siga las indicaciones.',
      fr: 'En raison d\'une interruption de transport, veuillez utiliser les navettes gratuites depuis le parking G vers Secaucus Junction.'
    },
    metricOverrides: {
      attendance: '79,940',
      temperature: '71°F',
      statusRating: 'DEGRADED',
      incidentCount: 1
    }
  },
  {
    id: 'severe_lightning',
    title: 'SEVERE WEATHER & LIGHTNING',
    severity: 'Extreme',
    description: 'Category 3 electrical storm detected within 2.5-mile perimeter. Immediate evacuation of open bowl under FIFA severe weather policy.',
    targetSector: 'North',
    dangerIndex: 95,
    confidenceScore: 98,
    sensorLogs: [
      'METEOROLOGY: Category 3 Lightning Strike detected within 2.5 miles of MetLife Stadium.',
      'SENSOR: Extreme wind shear warning (54 knots) at upper rim anemometer nodes.',
      'INFRA: Roof canopy static-charge sensors trigger pre-ionization lightning risk warning.',
      'COORD: NOAA and Local Emergency Operations Command issue immediate shelter-in-place order.'
    ],
    aiReasoning: 'Immediate life safety threat from electrical lightning strikes. Direct strike risk on exposed steel canopy is high under FIFA Severe Weather guidelines. Evacuation of open-air upper deck bowls and lower-bowl perimeter zones is critical. Field play must halt instantly.',
    directives: [
      'HALT match: Instruct FIFA match officials to halt play immediately and guide players to subterranean secure concrete team bunkers.',
      'EVACUATE bowl: Initiate immediate evacuation of all open seating bowl tiers to fully enclosed interior concrete concourses.',
      'BROADCAST emergency: Switch all digital stadium displays and LED ribbon boards to weather emergency instructions and guide shelter-in-place protocols.'
    ],
    translations: {
      en: 'An extreme weather warning has been issued. For your safety, evacuate your seats immediately and proceed to the covered, secure concourses.',
      es: 'Se ha emitido una alerta por clima extremo. Por su seguridad, evacúen sus asientos de inmediato y busquen refugio en los vestíbulos cubiertos.',
      fr: 'Une alerte météo extrême a été émise. Pour votre sécurité, veuillez évacuer vos sièges immédiatement et vous abriter dans les halls couverts.'
    },
    metricOverrides: {
      attendance: '82,410',
      temperature: '65°F',
      statusRating: 'EXTREME EVAC',
      incidentCount: 2
    }
  }
];
