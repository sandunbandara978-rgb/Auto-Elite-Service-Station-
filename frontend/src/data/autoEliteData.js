export const vehicleModelsByBrand = {
  'Porsche': [
    '911 GT3 RS (2024)',
    '911 Carrera S (2023)',
    'Cayenne Turbo GT (2024)',
    'Taycan Turbo S EV (2023)',
    'Panamera GTS (2022)',
    '718 Cayman GT4 RS (2024)'
  ],
  'BMW': [
    'M5 Competition (2024)',
    'M8 Competition Coupe (2023)',
    'M3 Competition xDrive (2024)',
    'X7 M60i (2024)',
    'i7 M70 xDrive EV (2024)',
    'Z4 M40i (2023)'
  ],
  'Mercedes-Benz': [
    'AMG G63 (2024)',
    'AMG GT 63 S 4-Door (2023)',
    'S 580 4MATIC (2024)',
    'Maybach S 680 (2024)',
    'AMG C63 S E-Performance (2024)',
    'EQS 580 4MATIC EV (2023)'
  ],
  'Audi': [
    'RS6 Avant Performance (2024)',
    'RS7 Sportback (2023)',
    'R8 V10 Performance (2023)',
    'RS Q8 (2024)',
    'e-tron GT RS EV (2024)',
    'S5 Sportback (2023)'
  ],
  'Lamborghini': [
    'Revuelto V12 Hybrid (2024)',
    'Huracan Sterrato (2024)',
    'Huracan STO (2023)',
    'Urus Performante (2024)',
    'Urus S (2023)',
    'Aventador Ultimae (2022)'
  ],
  'Ferrari': [
    'Purosangue V12 (2024)',
    'SF90 Stradale Hybrid (2023)',
    '296 GTB (2024)',
    '812 GTS (2023)',
    'F8 Tributo (2022)',
    'Roma Spider (2024)'
  ],
  'Range Rover': [
    'Range Rover SV Long Wheelbase (2024)',
    'Range Rover Sport SV (2024)',
    'Range Rover Autobiography (2023)',
    'Range Rover Velar Dynamic HSE (2024)',
    'Defender 110 V8 (2024)'
  ],
  'Tesla': [
    'Model S Plaid (2024)',
    'Model X Plaid (2024)',
    'Cybertruck Cyberbeast (2024)',
    'Model 3 Performance (2024)',
    'Model Y Long Range (2024)'
  ],
  'Other Luxury / EV': [
    'Bentley Continental GT V8 (2024)',
    'Rolls-Royce Cullinan (2024)',
    'Aston Martin DB12 (2024)',
    'Maserati MC20 (2024)',
    'Lucid Air Sapphire (2024)'
  ]
};

export const autoEliteServices = [
  {
    id: 'oil-change',
    name: 'Synthetic Oil & Filter Service',
    category: 'Maintenance',
    price: 'LKR 45,000',
    rawPrice: 45000,
    duration: '45 mins',
    warranty: '6 Months / 6,000 km',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    description: 'High-performance ultra-synthetic engine oil flush, OEM filter replacement, and multi-point lubricant inspection for Sri Lankan tropical climate.',
    features: [
      'Liqui Moly / Mobil 1 European Formula Synthetic Oil',
      'OEM Certified Filter Replacement',
      'Engine Flush & Sludge Removal',
      'Fluid Level Top-Off (Coolant, Brake, Washer)',
      'Digital Vehicle Condition Checklist'
    ]
  },
  {
    id: 'brake-repair',
    name: 'Performance Brake System Overhaul',
    category: 'Safety',
    price: 'LKR 85,000',
    rawPrice: 85000,
    duration: '1.5 Hours',
    warranty: '12 Months / 12,000 km',
    icon: 'Disc',
    image: 'https://images.unsplash.com/photo-1600706432502-7789f2a4cfd2?auto=format&fit=crop&w=1200&q=80',
    description: 'Ceramic brake pad replacement, slotted rotor resurfacing, high-pressure fluid bleed, and caliper calibration.',
    features: [
      'Brembo / Ceramic Low-Dust Brake Pads',
      'Precision Rotor Resurfacing & Balance',
      'Brake Line Bleed & DOT4 Fluid Flush',
      'Caliper Lubrication & Hardware Renewal',
      'Anti-Squeal Thermal Coating'
    ]
  },
  {
    id: 'wheel-alignment',
    name: '3D Laser Wheel Alignment',
    category: 'Maintenance',
    price: 'LKR 35,000',
    rawPrice: 35000,
    duration: '1 Hour',
    warranty: '6 Months',
    icon: 'Maximize',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1200&q=80',
    description: 'Hunter Hawkeye 3D digital laser wheel alignment for camber, caster, and toe settings with high-speed road force wheel balancing.',
    features: [
      'Hunter 3D Laser Alignment Calibration',
      'Road Force Dynamic Wheel Balancing',
      'Tire Pressure Monitoring System (TPMS) Reset',
      'Suspension Geometry Inspection',
      'Steering Angle Sensor Reset'
    ]
  },
  {
    id: 'engine-diagnostics',
    name: 'Computerized Engine Diagnostics',
    category: 'Diagnostics',
    price: 'LKR 28,000',
    rawPrice: 28000,
    duration: '45 mins',
    warranty: 'Guaranteed Diagnosis',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    description: 'OEM factory-level computer diagnostic scan across ECU, TCU, ABS, and Airbag modules with live telemetry reporting.',
    features: [
      'Full ECU Fault Code Scanning & Analysis',
      'Live Sensor Stream Telemetry',
      'Emissions Readiness Verification',
      'Ignition & Injection Timing Test',
      'Comprehensive Master Technician Report'
    ]
  },
  {
    id: 'battery-replacement',
    name: 'AGM Battery & Charging System',
    category: 'Electrical',
    price: 'LKR 65,000',
    rawPrice: 65000,
    duration: '30 mins',
    warranty: '3 Years Replacement',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    description: 'Heavy-duty AGM battery installation, alternator output voltage test, parasitic draw analysis, and ECU battery registration.',
    features: [
      'Varta / Bosch AGM High-Cold-Crank Battery',
      'ECU Battery Management Registration',
      'Terminal Corrosion Protection Treatment',
      'Starter & Alternator Output Diagnostics',
      'Disposal of Old Battery'
    ]
  },
  {
    id: 'ac-service',
    name: 'Climate Control & Tropical AC Overhaul',
    category: 'Comfort',
    price: 'LKR 52,000',
    rawPrice: 52000,
    duration: '1 Hour',
    warranty: '12 Months',
    icon: 'Wind',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    description: 'R134a / R1234yf refrigerant evac & recharge, cabin air filter replacement, evaporator anti-bacterial sanitization, and Sri Lankan high-humidity leak test.',
    features: [
      'Full Refrigerant Evacuate & Recharge',
      'Compressor Oil Top-up & Pressure Check',
      'HEPA Carbon Cabin Air Filter Replacement',
      'Evaporator Ultrasonic Ozone Sanitization',
      'UV Dye Leak Detection Analysis'
    ]
  },
  {
    id: 'car-painting',
    name: 'Italian Bake Oven Custom Painting',
    category: 'Body & Paint',
    price: 'LKR 450,000',
    rawPrice: 450000,
    duration: '3-5 Days',
    warranty: '5 Years Color Fade Guarantee',
    icon: 'Palette',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    description: 'Computerized PPG color match, dust-free Italian climate-controlled spray booth painting, and multi-stage ceramic clear coat.',
    features: [
      'PPG Spectrophotometer Computer Color Match',
      'Blowtherm Down-Draft Bake Oven Painting',
      'Multi-Stage High-Solid Ceramic Clear Coat',
      'Panel Surface Wet Sanding & Feathering',
      'Final Mirror-Polish Finish'
    ]
  },
  {
    id: 'car-detailing',
    name: 'Executive Interior & Exterior Detailing',
    category: 'Detailing',
    price: 'LKR 95,000',
    rawPrice: 95000,
    duration: '4 Hours',
    warranty: 'Satisfaction Guaranteed',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep steam cleaning, leather conditioning, single-stage paint correction polish, engine bay detail, and wheel ceramic seal.',
    features: [
      'Single-Stage Paint Correction & Polish',
      'Interior Hot Water Steam Extraction',
      'Swissvax Leather Conditioning Treatment',
      'Engine Bay Degreasing & Dressing',
      'Wheel & Caliper Hydrophobic Seal'
    ]
  },
  {
    id: 'ceramic-coating',
    name: '9H Nano Ceramic Coating System',
    category: 'Protection',
    price: 'LKR 245,000',
    rawPrice: 245000,
    duration: '2 Days',
    warranty: '3 Years Warranty',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80',
    description: 'Multi-stage paint correction followed by 2 layers of 9H Ceramic Coating for supreme hydrophobic gloss, UV & scratch protection.',
    features: [
      'Dual-Stage Paint Correction (Swirl Removal)',
      '2 Layers 9H Gtechniq / Ceramic Pro Shield',
      'Glass Hydrophobic Windshield Coating',
      'Wheel Rim & Brake Caliper Thermal Shield',
      'IR Lamp Curing & Warranty Certificate'
    ]
  },
  {
    id: 'vehicle-modification',
    name: 'Bespoke Performance & Body Tuning',
    category: 'Performance',
    price: 'LKR 680,000',
    rawPrice: 680000,
    duration: 'Custom Schedule',
    warranty: '2 Years Workmanship',
    icon: 'Gauge',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
    description: 'Stage 1/2 ECU remap, valved titanium exhaust installation, air suspension lowering kits, and carbon fiber body kit fitting.',
    features: [
      'Custom ECU & TCU Transmission Remap',
      'Valved Titanium Performance Exhaust Systems',
      'KW / Bilstein Coilover & Air Suspension Install',
      'Carbon Fiber Aero Splitters & Diffusers',
      'Dyno Tuning & Horsepower Verification Graph'
    ]
  },
  {
    id: 'insurance-inspection',
    name: '150-Point Digital Inspection & Report',
    category: 'Diagnostics',
    price: 'LKR 38,000',
    rawPrice: 38000,
    duration: '1.5 Hours',
    warranty: 'Official Certified Document',
    icon: 'FileCheck',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    description: 'Comprehensive 150-point certified condition analysis for pre-purchase evaluation, Sri Lanka insurance assessment, or warranty validation.',
    features: [
      '150-Point Physical & Electronic Check',
      'Paint Thickness Depth Gauge Scan (Accident Check)',
      'Under-Carriage & Chassis Alignment Audit',
      'High-Resolution Photo & Video Diagnostic Log',
      'Certified Digital PDF Assessment Report'
    ]
  },
  {
    id: 'roadside-assistance',
    name: '24/7 Islandwide Emergency Dispatch',
    category: 'Emergency',
    price: 'LKR 25,000',
    rawPrice: 25000,
    duration: '15-20 Min Arrival',
    warranty: '24/7 Availability',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    description: 'On-demand flatbed towing across Sri Lanka, flat tire replacement, fuel delivery, battery jumpstart, and mobile lockout assistance.',
    features: [
      'Low-Angle Flatbed Towing (Safe for Low Supercars)',
      'Mobile Battery Jumpstart & Tester',
      'Flat Tire Repair & Spare Wheel Mount',
      'Emergency Fuel Delivery (10 Litres)',
      'GPS Live Dispatch Technician Tracking'
    ]
  }
];

export const autoElitePackages = [
  {
    id: 'bronze',
    name: 'Bronze Essential',
    subtitle: 'Routine maintenance for reliable Sri Lankan daily driving',
    price: 'LKR 65,000',
    period: 'per service',
    popular: false,
    color: 'from-slate-700 to-slate-900',
    borderColor: 'border-slate-700',
    badge: 'Standard',
    features: [
      'Synthetic Engine Oil & OEM Filter Service',
      '30-Point Safety & Fluid Inspection',
      'Tire Pressure Calibration & Rotation',
      'Battery Voltage & Alternator Audit',
      'Complimentary Exterior Hand Wash'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Executive',
    subtitle: 'Complete care for executive sedans & luxury SUVs',
    price: 'LKR 125,000',
    period: 'per service',
    popular: true,
    color: 'from-amber-600/30 to-amber-900/40',
    borderColor: 'border-gold',
    badge: 'Most Popular',
    features: [
      'Everything in Bronze Package',
      'Brake Fluid Bleed & Pad Inspection',
      '3D Laser Wheel Alignment Check',
      'Cabin & Engine Air Filter Replacement',
      'Computer ECU Diagnostic Fault Scan',
      'Full Interior Vacuum & Leather Wipe'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Performance',
    subtitle: 'Comprehensive precision maintenance for luxury sports cars',
    price: 'LKR 245,000',
    period: 'per service',
    popular: false,
    color: 'from-yellow-700/20 to-slate-900',
    borderColor: 'border-yellow-500/50',
    badge: 'High Performance',
    features: [
      'Everything in Silver Package',
      'Spark Plug & Ignition Coil Renewal',
      'Transmission Fluid & Filter Service',
      'AC Climate Evac & Sanitization',
      'Single-Stage Exterior Paint Polish',
      'Free Loaner Vehicle during service'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Concierge',
    subtitle: 'Ultimate VIP protection & concierge garage care in Sri Lanka',
    price: 'LKR 480,000',
    period: 'per year',
    popular: false,
    color: 'from-gold/20 via-slate-900 to-charcoal-dark',
    borderColor: 'border-gold',
    badge: 'VIP Membership',
    features: [
      'Unlimited Oil & Filter Servicing (1 Year)',
      '24/7 Priority Concierge Flatbed Pickup & Return',
      'Annual 9H Ceramic Coating Refresh',
      'Free Unlimited 150-Point Inspections',
      '20% Off All Performance Tuning & Detailing',
      'Dedicated Master Technician Manager'
    ]
  }
];

export const autoEliteMechanics = [
  {
    id: 'mechanic-1',
    name: 'Kumara Wickramasinghe',
    role: 'Chief OEM Master Powertrain Engineer',
    experience: '18 Years Experience',
    specialty: 'Porsche & German Supercars',
    rating: 4.98,
    reviews: 342,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Former Stuttgart Factory Master Technician for Porsche. Chief Master Engineer leading supercar diagnostics at AUTO ELITE Colombo.'
  },
  {
    id: 'mechanic-2',
    name: 'Bandara Jayawardena',
    role: 'Chief ECU & Performance Tuning Specialist',
    experience: '14 Years Experience',
    specialty: 'BMW M & Mercedes AMG Tuning',
    rating: 5.0,
    reviews: 298,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Lead Electronic Systems Architect. Certified Master in Bosch Motronic, AMG Speedshift, and ECU telemetry mapping.'
  },
  {
    id: 'mechanic-3',
    name: 'Nalin Fernando',
    role: 'Master Detailing & Paint Booth Specialist',
    experience: '16 Years Experience',
    specialty: '9H Ceramic Coating & Italian Bake Oven',
    rating: 4.95,
    reviews: 264,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Swissvax certified detailing master. Specialist in tropical ceramic protection, paint depth gauge restoration, and bake booth finish.'
  },
  {
    id: 'mechanic-4',
    name: 'Dilshan Rathnayake',
    role: 'Hybrid & EV Powertrain Master Engineer',
    experience: '12 Years Experience',
    specialty: 'Tesla EV & Hybrid High-Voltage',
    rating: 4.92,
    reviews: 215,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Certified High-Voltage EV Systems Master. Specialist in electric motor calibration, battery thermal management, and hybrid regeneration.'
  }
];

export const autoEliteGallery = [
  {
    id: 'gal-1',
    title: 'Ford Mustang Shelby GT500 Dark Horse Full Ceramic & Tuning (Colombo 07)',
    category: 'Supercars',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    tag: 'Mustang Supercar'
  },
  {
    id: 'gal-2',
    title: 'Lamborghini Huracan Brake Overhaul (Rajagiriya Station)',
    category: 'Supercars',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
    tag: 'Brembo Carbon'
  },
  {
    id: 'gal-3',
    title: 'BMW M5 Competition Engine Rebuild',
    category: 'Engine Repair',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    tag: 'V8 Twin Turbo'
  },
  {
    id: 'gal-4',
    title: 'Mercedes-AMG G63 Matte Black Paint & Bake Oven',
    category: 'Body & Paint',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Bake Oven Paint'
  },
  {
    id: 'gal-5',
    title: 'Audi RS6 Avant Executive Interior Steam Detail',
    category: 'Detailing',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    tag: 'Swissvax Leather'
  },
  {
    id: 'gal-6',
    title: 'Modern Climate-Controlled Service Station (Colombo 07 Hub)',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Colombo Station'
  }
];

export const autoEliteTestimonials = [
  {
    id: 't-1',
    author: 'Dinesh Perera',
    role: 'Owner, Porsche 911 Turbo S (Colombo 07)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    date: '2 Days Ago',
    service: '9H Ceramic & ECU Remap',
    comment: 'AUTO ELITE Colombo is unmatched in Sri Lanka. They completed a Stage 2 ECU tune and 9H Ceramic coating on my 911 Turbo. The transparency, video diagnostic updates, and craftsmanship were world-class.'
  },
  {
    id: 't-2',
    author: 'Dilhani Jayawardena',
    role: 'Collector, Range Rover SV (Kandy & Colombo)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    date: '1 Week Ago',
    service: 'Platinum Concierge Care',
    comment: 'The Sri Lanka concierge flatbed pickup service is seamless. They handle my entire luxury fleet with extreme precision. You know your vehicles are in master hands at their Cinnamon Gardens facility.'
  },
  {
    id: 't-3',
    author: 'Kushan Rajapaksha',
    role: 'CEO, BMW M8 Competition Owner (Rajagiriya)',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    date: '2 Weeks Ago',
    service: '3D Alignment & Brake Overhaul',
    comment: 'The 3D Hunter laser alignment solved a high-speed vibration on the Southern Expressway that other workshops failed to fix. Exceptional master mechanics and 5-star Colombo reception.'
  }
];

export const autoEliteBlogs = [
  {
    id: 'blog-1',
    title: 'How 9H Ceramic Coating Protects Luxury Paint in Sri Lankan Tropical Heat',
    category: 'Detailing Tech',
    date: 'July 20, 2026',
    author: 'Julian Sterling',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80',
    snippet: 'Discover the molecular nanotech behind ceramic glass coatings and why traditional wax fails under high UV rays and monsoonal humidity.'
  },
  {
    id: 'blog-2',
    title: 'High-Performance Synthetic Oils Suited for Sri Lankan Climate',
    category: 'Engine Tech',
    date: 'July 14, 2026',
    author: 'Marcus Vance',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    snippet: 'Understanding viscosity indexes, ester formulations, and oil film strength under high humidity and heavy city traffic.'
  },
  {
    id: 'blog-3',
    title: 'Electric & Hybrid Vehicle Battery Maintenance Protocols in Sri Lanka',
    category: 'EV Tech',
    date: 'June 28, 2026',
    author: 'Elena Rostova',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    snippet: 'Key guidelines for maintaining battery health, thermal coolant loops, and regenerative brake calibrations in modern EVs across Sri Lanka.'
  }
];

export const autoEliteFaqs = [
  {
    q: 'Where is AUTO ELITE located in Sri Lanka?',
    a: 'Our flagship Sri Lanka Grand Station is located at 100 Apex Boulevard, Cinnamon Gardens, Colombo 07. We also operate express service centers in Rajagiriya, Kandy, Galle, and Negombo.'
  },
  {
    q: 'How does AUTO ELITE differ from Sri Lankan dealership service centers?',
    a: 'AUTO ELITE combines OEM-certified master technicians, dealership-grade factory diagnostic scanners (Porsche PIWIS, BMW ISTA, Mercedes XENTRY), and 100% genuine parts with lower hourly rates and transparent 4K video diagnostic reports sent directly to your phone.'
  },
  {
    q: 'Is there a warranty on parts and craftsmanship?',
    a: 'Yes! Every service at AUTO ELITE carries a minimum 12-Month / 12,000-km comprehensive warranty on parts and labor. Major repairs and ceramic coatings feature up to 5-Year guarantees.'
  },
  {
    q: 'Do you offer islandwide vehicle pick-up and delivery in Sri Lanka?',
    a: 'Yes. Our Platinum Concierge program includes enclosed flatbed transport of your vehicle to and from our service station anywhere in Colombo, Kandy, Galle, or Negombo.'
  },
  {
    q: 'What is included in the LKR 38,000 150-Point Digital Inspection?',
    a: 'Our inspection includes digital paint depth scanning (for hidden bodywork), ECU electronic diagnostic fault scans, chassis alignment checks, brake rotor measurements, fluid spectroscopy analysis, and a comprehensive HD photo report.'
  }
];
