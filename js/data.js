/**
 * data.js – Static game data
 * Exports: CATS, CARDS, SHIELDS, SHIELD_COLORS, PRES_TYPES, ACHIEVEMENTS, MOTES
 */

/** @type {{ id: string, label: string, color: string }[]} */
export const CATS = [
  { id:'directiva', label:'Despachos y Maletines', color:'#854F0B' },
  { id:'vestuario', label:'El Vestuario Salvaje',  color:'#534AB7' },
  { id:'banquillo', label:'El Banquillo Hirviendo', color:'#185FA5' },
  { id:'prensa',   label:'Gradas y Prensa',        color:'#993C1D' },
  { id:'partido',  label:'El Circo del Partido',   color:'#0F6E56' }
];

/** @type {Array<{id:string,cat:string,title:string,desc:string,a:object,b:object}>} */
export const CARDS = [
  {id:'c1',cat:'directiva',title:'El Maletín Misterioso',desc:'Un emisario te ofrece una maleta llena de dinero si "aflojas" el próximo partido.',
   a:{label:'Aceptar el trato',fx:{money:+30,press:-5,vest:-10,power:-5},bomb:true},
   b:{label:'Rechazar y denunciar',fx:{money:-5,press:+20,vest:+5,power:+10}}},

  {id:'c2',cat:'directiva',title:'El Fichaje Fantasma',desc:'El presidente te exige fichar al hijo de su socio. Es malísimo.',
   a:{label:'Ficharlo sin más',fx:{money:-15,press:-10,vest:-20,power:+20}},
   b:{label:'Negarte educadamente',fx:{money:0,press:+5,vest:+10,power:-20}}},

  {id:'c3',cat:'directiva',title:'Cuentas en Suiza',desc:'Viene Hacienda. ¿Escondes los contratos reales de las estrellas o dices la verdad?',
   a:{label:'Esconder los contratos',fx:{money:+15,press:-5,vest:0,power:+10},bomb:true},
   b:{label:'Decir la verdad',fx:{money:-20,press:+15,vest:+5,power:-5}}},

  {id:'c4',cat:'directiva',title:'El VP de los Árbitros',desc:'Un exárbitro se ofrece de "consultor" por una generosa cifra para darte "paz arbitral".',
   a:{label:'Contratarlo',fx:{money:-20,press:-5,vest:+10,power:+15},bomb:true},
   b:{label:'Rechazarlo',fx:{money:0,press:+10,vest:0,power:0}}},

  {id:'c5',cat:'directiva',title:'Apuestas Clandestinas',desc:'Descubres que el vicepresidente está apostando en contra de tu propio equipo.',
   a:{label:'Echarlo y denunciar',fx:{money:0,press:+20,vest:+5,power:-15}},
   b:{label:'Chantajearlo',fx:{money:+20,press:0,vest:0,power:+10},bomb:true}},

  {id:'c6',cat:'directiva',title:'Fondos Buitre',desc:'Un fondo turbio quiere comprar el 50% de los derechos de tu canterano estrella.',
   a:{label:'Aceptar el trato',fx:{money:+30,press:-15,vest:-10,power:+5}},
   b:{label:'Rechazar',fx:{money:0,press:+10,vest:+5,power:0}}},

  {id:'c7',cat:'directiva',title:'La Comisión del Padre',desc:'El padre de tu mejor jugador exige 10 millones bajo la mesa para renovar.',
   a:{label:'Pagar',fx:{money:-25,press:0,vest:+15,power:+5}},
   b:{label:'Negarte y venderlo',fx:{money:+20,press:-10,vest:-20,power:0}}},

  {id:'c8',cat:'directiva',title:'Venta del Nombre del Estadio',desc:'Una empresa de criptomonedas sospechosa ofrece una millonada por renombrar el estadio.',
   a:{label:'Aceptar',fx:{money:+35,press:-20,vest:-5,power:+5},bomb:true},
   b:{label:'Rechazar',fx:{money:0,press:+15,vest:0,power:0}}},

  {id:'c9',cat:'directiva',title:'Facturas Infladas',desc:'El contable propone inflar el valor de los canteranos para saltarse el Fair Play Financiero.',
   a:{label:'Aprobar el método',fx:{money:+20,press:0,vest:0,power:+10},bomb:true},
   b:{label:'Rechazar',fx:{money:-10,press:+10,vest:0,power:0}}},

  {id:'c10',cat:'directiva',title:'La Superliga',desc:'Te invitan a una liga privada de ricos. Ganarás millones, pero la afición y la federación te odiarán.',
   a:{label:'Unirse a la Superliga',fx:{money:+50,press:-40,vest:+10,power:+20}},
   b:{label:'Rechazar públicamente',fx:{money:-5,press:+25,vest:0,power:-10}}},

  {id:'c11',cat:'directiva',title:'El Palco VIP',desc:'Un político corrupto pide pases gratis de por vida a cambio de agilizar las licencias del estadio.',
   a:{label:'Aceptar',fx:{money:+15,press:-10,vest:0,power:+15},bomb:true},
   b:{label:'Rechazar',fx:{money:-10,press:+10,vest:0,power:-5}}},

  {id:'c12',cat:'directiva',title:'El Espía',desc:'El director deportivo propone contratar un detective para seguir a tu jugador más fiestero.',
   a:{label:'Contratar al detective',fx:{money:-10,press:-10,vest:-15,power:+10}},
   b:{label:'Hablar con el jugador',fx:{money:0,press:0,vest:+10,power:0}}},

  {id:'c13',cat:'directiva',title:'El Jet Privado',desc:'El presidente quiere usar el avión del equipo para irse de vacaciones con su familia.',
   a:{label:'Dejarle',fx:{money:-15,press:-5,vest:-5,power:+20}},
   b:{label:'Negarte',fx:{money:0,press:+5,vest:+5,power:-25}}},

  {id:'c14',cat:'directiva',title:'Patrocinador Polémico',desc:'Una marca de apuestas de dudosa reputación ofrece el triple que tu patrocinador actual.',
   a:{label:'Firmar',fx:{money:+40,press:-20,vest:-5,power:+10}},
   b:{label:'Rechazar',fx:{money:-5,press:+10,vest:0,power:0}}},

  {id:'c15',cat:'directiva',title:'La Prima por Ganar',desc:'Un tercer club te ofrece dinero legalmente dudoso para que le ganes al líder de la liga.',
   a:{label:'Aceptar',fx:{money:+25,press:-5,vest:+10,power:+5},bomb:true},
   b:{label:'Rechazar',fx:{money:0,press:+10,vest:0,power:0}}},

  {id:'c16',cat:'directiva',title:'El Topo en el Vestuario',desc:'Alguien filtra los sueldos de la plantilla a la prensa. ¿Haces un interrogatorio agresivo?',
   a:{label:'Interrogar a todos',fx:{money:-5,press:0,vest:-20,power:+10}},
   b:{label:'Investigar en silencio',fx:{money:-10,press:0,vest:0,power:+5}}},

  {id:'c17',cat:'directiva',title:'Corte de Luz Oportunista',desc:'Vas perdiendo 0-3. Alguien sugiere apagar los focos del estadio "accidentalmente".',
   a:{label:'Hacerlo',fx:{money:0,press:-25,vest:+5,power:-10}},
   b:{label:'No tocar nada',fx:{money:0,press:+5,vest:0,power:0}}},

  {id:'c18',cat:'directiva',title:'Sobreprecio en Obras',desc:'El constructor del estadio, amigo del presidente, pide un 30% más de presupuesto.',
   a:{label:'Aprobarlo',fx:{money:-30,press:0,vest:0,power:+20}},
   b:{label:'Buscar otro constructor',fx:{money:0,press:+5,vest:0,power:-20}}},

  {id:'c19',cat:'directiva',title:'Campaña de Bots',desc:'Un asesor propone pagar cuentas falsas en redes para defender tu gestión y atacar rivales.',
   a:{label:'Pagar la campaña',fx:{money:-15,press:+20,vest:0,power:+10},bomb:true},
   b:{label:'Rechazarlo',fx:{money:0,press:0,vest:0,power:0}}},

  {id:'c20',cat:'directiva',title:'La Prima Tramposa',desc:'Tu delegado "sugiere" meter dinero extra en los bonos de partido sin declararlo.',
   a:{label:'Aprobar',fx:{money:+20,press:0,vest:+15,power:+5},bomb:true},
   b:{label:'No tocar nada',fx:{money:0,press:0,vest:+5,power:0}}},

  {id:'c21',cat:'vestuario',title:'Cumpleaños en Brasil',desc:'Tu estrella brasileña dice que su hermana cumple años y debe viajar ya, antes del partido del sábado.',
   a:{label:'Dejarle ir',fx:{money:0,press:-10,vest:+15,power:-10}},
   b:{label:'Negarle el permiso',fx:{money:0,press:+5,vest:-20,power:+10}}},

  {id:'c22',cat:'vestuario',title:'Resaca Matutina',desc:'Tu centrocampista estrella llega al entrenamiento oliendo a alcohol. El míster está furioso.',
   a:{label:'Sancionarlo públicamente',fx:{money:0,press:+10,vest:-15,power:+5}},
   b:{label:'Taparlo',fx:{money:0,press:-10,vest:+10,power:-5},bomb:true}},

  {id:'c23',cat:'vestuario',title:'El Triángulo Amoroso',desc:'El delantero estrella sale con la exesposa del capitán. El vestuario está completamente roto.',
   a:{label:'Vender al delantero',fx:{money:+15,press:-10,vest:+20,power:+5}},
   b:{label:'Vender al capitán',fx:{money:0,press:-15,vest:-10,power:0}}},

  {id:'c24',cat:'vestuario',title:'Silla del Dentista',desc:'Se filtran fotos de tus jugadores bebiendo en un pub inglés la noche antes del partido.',
   a:{label:'Sancionarlos',fx:{money:0,press:+15,vest:-20,power:+10}},
   b:{label:'Negar la mayor',fx:{money:0,press:-20,vest:+10,power:-5}}},

  {id:'c25',cat:'vestuario',title:'Peluquero a Bordo',desc:'El extremo exige que su peluquero personal viaje siempre en el avión del equipo.',
   a:{label:'Aceptar',fx:{money:-10,press:-5,vest:+15,power:-10}},
   b:{label:'Negarte',fx:{money:0,press:+5,vest:-15,power:+5}}},

  {id:'c26',cat:'vestuario',title:'Hamburguesa en el Descanso',desc:'El preparador físico pilla a un jugador comiendo comida rápida en el vestuario.',
   a:{label:'Multa y humillación',fx:{money:+5,press:+5,vest:-15,power:+5}},
   b:{label:'Hablarlo en privado',fx:{money:0,press:0,vest:+5,power:0}}},

  {id:'c27',cat:'vestuario',title:'Póker Clandestino',desc:'Descubres una timba de altas apuestas en el hotel de concentración, la noche anterior al derbi.',
   a:{label:'Denunciarla al míster',fx:{money:0,press:+5,vest:-20,power:+10}},
   b:{label:'Mirar para otro lado',fx:{money:0,press:-10,vest:+10,power:0},bomb:true}},

  {id:'c28',cat:'vestuario',title:'Pelea por el Penalti',desc:'Dos jugadores casi se pegan por ver quién tira el penalti decisivo. El árbitro espera.',
   a:{label:'Dejarlos decidirlo',fx:{money:0,press:0,vest:-10,power:-5}},
   b:{label:'Ordenar quién lanza',fx:{money:0,press:+5,vest:-5,power:+10}}},

  {id:'c29',cat:'vestuario',title:'El Rapero',desc:'Un jugador quiere lanzar un disco criticando abiertamente a la directiva.',
   a:{label:'Prohibírselo',fx:{money:0,press:-10,vest:-10,power:+15}},
   b:{label:'Dejarle ser artista',fx:{money:0,press:+10,vest:+10,power:-10}}},

  {id:'c30',cat:'vestuario',title:'Instagram Live Fatal',desc:'Un canterano emite en directo desde el vestuario y se ven las tácticas en la pizarra.',
   a:{label:'Cesión inmediata',fx:{money:+10,press:+5,vest:-15,power:+10}},
   b:{label:'Multa y formación',fx:{money:-5,press:0,vest:-5,power:+5}}},

  {id:'c31',cat:'vestuario',title:'Boda en Las Vegas',desc:'Tu portero se ha escapado en mitad de la temporada para casarse en Las Vegas sin avisar a nadie.',
   a:{label:'Rescindirle el contrato',fx:{money:-10,press:+10,vest:-10,power:+15}},
   b:{label:'Multa y perdón',fx:{money:-5,press:-5,vest:+5,power:0}}},

  {id:'c32',cat:'vestuario',title:'El Virus FIFA',desc:'Tu estrella finge lesión con su selección para irse de vacaciones a Ibiza.',
   a:{label:'Denunciar a la selección',fx:{money:0,press:+5,vest:-10,power:+10}},
   b:{label:'Cubrirle las espaldas',fx:{money:0,press:-10,vest:+15,power:-5}}},

  {id:'c33',cat:'vestuario',title:'Reloj Desaparecido',desc:'Desaparece un reloj de 50.000€ del vestuario. Los jugadores sospechan entre ellos.',
   a:{label:'Llamar a la policía',fx:{money:0,press:-10,vest:-20,power:0}},
   b:{label:'Investigación interna',fx:{money:-10,press:0,vest:-10,power:+5}}},

  {id:'c34',cat:'vestuario',title:'El Bólido Estrellado',desc:'Tu joven promesa estrella un Ferrari contra la puerta de la ciudad deportiva a las 3 AM.',
   a:{label:'Venderlo en el mercado',fx:{money:+20,press:+10,vest:0,power:+5}},
   b:{label:'Apoyo y tratamiento',fx:{money:-10,press:-10,vest:+10,power:-5}}},

  {id:'c35',cat:'vestuario',title:'Directo en Twitch',desc:'Un jugador lesionado pasa la noche jugando online y critica tus tácticas en directo.',
   a:{label:'Sanción dura',fx:{money:0,press:+5,vest:-15,power:+10}},
   b:{label:'Pedir disculpas públicas',fx:{money:0,press:-5,vest:-5,power:0}}},

  {id:'c36',cat:'vestuario',title:'El Amuleto Apestoso',desc:'Un defensa se niega a lavar sus botas de la suerte. El olor en el vestuario es insoportable.',
   a:{label:'Ordenar lavarlas',fx:{money:0,press:0,vest:-10,power:+5}},
   b:{label:'Dejarle con sus rituales',fx:{money:0,press:0,vest:+5,power:-5}}},

  {id:'c37',cat:'vestuario',title:'El Doble del Jugador',desc:'Descubres que tu estrella envió a un actor parecido a él a firmar autógrafos.',
   a:{label:'Hacerlo público',fx:{money:0,press:-15,vest:0,power:0}},
   b:{label:'Silenciarlo a cambio',fx:{money:-10,press:0,vest:+5,power:+5}}},

  {id:'c38',cat:'vestuario',title:'Boicot al Capitán',desc:'El grupo de los jóvenes quiere quitarle el brazalete al veterano del equipo.',
   a:{label:'Apoyar a los jóvenes',fx:{money:0,press:-5,vest:-10,power:0}},
   b:{label:'Mantener al capitán',fx:{money:0,press:+5,vest:-15,power:+10}}},

  {id:'c39',cat:'vestuario',title:'El Documental de Amazon',desc:'Una estrella exige que rueden su documental de Amazon dentro del vestuario.',
   a:{label:'Aceptar',fx:{money:+20,press:+10,vest:-10,power:-10}},
   b:{label:'Negarle',fx:{money:0,press:-5,vest:+5,power:+10}}},

  {id:'c40',cat:'vestuario',title:'Dieta Rebelde',desc:'El nutricionista denuncia que el delantero centro se niega a comer verduras desde hace tres meses.',
   a:{label:'Cláusula alimentaria',fx:{money:0,press:0,vest:-10,power:+10}},
   b:{label:'Dejarle comer lo que quiera',fx:{money:0,press:0,vest:+10,power:-5}}},

  {id:'c41',cat:'banquillo',title:'Espionaje con Dron',desc:'Tu entrenador envía un dron para grabar el entrenamiento a puerta cerrada del rival.',
   a:{label:'Aprobar la operación',fx:{money:0,press:-15,vest:+10,power:+5},bomb:true},
   b:{label:'Prohibirlo',fx:{money:0,press:+10,vest:-5,power:0}}},

  {id:'c42',cat:'banquillo',title:'El Dedo en el Ojo',desc:'En plena tangana, tu entrenador le mete el dedo en el ojo al asistente rival.',
   a:{label:'Defenderle públicamente',fx:{money:-10,press:-20,vest:+10,power:+5}},
   b:{label:'Distanciarte',fx:{money:0,press:+10,vest:-10,power:-5}}},

  {id:'c43',cat:'banquillo',title:'Rueda de Prensa Incendiaria',desc:'Tras perder, el entrenador dice que la plantilla es mediocre y no da para más.',
   a:{label:'Apoyar sus palabras',fx:{money:0,press:-20,vest:-25,power:+5}},
   b:{label:'Desmentirle públicamente',fx:{money:0,press:+10,vest:+5,power:-15}}},

  {id:'c44',cat:'banquillo',title:'El Autobús',desc:'El míster propone jugar con 10 defensas el próximo partido. Efectivo pero espantoso.',
   a:{label:'Apoyar la táctica',fx:{money:0,press:-15,vest:-5,power:+10}},
   b:{label:'Intervenir',fx:{money:0,press:+10,vest:+5,power:-15}}},

  {id:'c45',cat:'banquillo',title:'El Chamán',desc:'Para curar la rodilla de la estrella, el entrenador trae un curandero con rituales de fuego.',
   a:{label:'Dejarlo pasar',fx:{money:-5,press:-10,vest:+15,power:-5}},
   b:{label:'Parar el circo',fx:{money:0,press:+10,vest:-10,power:+5}}},

  {id:'c46',cat:'banquillo',title:'Prohibido el Ketchup',desc:'El nuevo entrenador prohíbe las salsas y los dulces. Los jugadores están furiosos.',
   a:{label:'Apoyarle',fx:{money:0,press:0,vest:-15,power:+10}},
   b:{label:'Negociar la norma',fx:{money:0,press:0,vest:+10,power:-10}}},

  {id:'c47',cat:'banquillo',title:'Concentración Militar',desc:'Tras una mala racha, el míster quiere encerrar al equipo en un hotel durante 15 días.',
   a:{label:'Aprobarlo',fx:{money:-20,press:+5,vest:-20,power:+10}},
   b:{label:'Negarlo',fx:{money:0,press:-5,vest:+10,power:-15}}},

  {id:'c48',cat:'banquillo',title:'El Hijo del Míster',desc:'El entrenador insiste en alinear a su hijo, que claramente no tiene nivel para primera.',
   a:{label:'Ceder',fx:{money:0,press:-15,vest:-15,power:+20}},
   b:{label:'Negarte',fx:{money:0,press:+10,vest:+10,power:-25}}},

  {id:'c49',cat:'banquillo',title:'Psicología Inversa',desc:'El entrenador decide insultar públicamente a tu mejor jugador para "motivarlo".',
   a:{label:'Apoyar el método',fx:{money:0,press:-10,vest:-20,power:+5}},
   b:{label:'Parar los insultos',fx:{money:0,press:+5,vest:+10,power:-10}}},

  {id:'c50',cat:'banquillo',title:'El Cuaderno del Rival',desc:'Un utillero encuentra la libreta de tácticas del entrenador rival olvidada en el vestuario.',
   a:{label:'Leerla y usarla',fx:{money:0,press:-10,vest:+10,power:+15}},
   b:{label:'Devolvérsela',fx:{money:0,press:+20,vest:+5,power:-5}}},

  {id:'c51',cat:'banquillo',title:'Cambio en el Minuto 1',desc:'El míster quiere cambiar a un jugador en el primer minuto solo para humillarlo.',
   a:{label:'Permitirlo',fx:{money:0,press:-10,vest:-20,power:+10}},
   b:{label:'Impedirlo',fx:{money:0,press:+5,vest:+10,power:-15}}},

  {id:'c52',cat:'banquillo',title:'Entrenamiento a las 6 AM',desc:'Como castigo por perder, el míster cita a la plantilla al amanecer.',
   a:{label:'Apoyarlo',fx:{money:0,press:0,vest:-15,power:+10}},
   b:{label:'Modificar el horario',fx:{money:0,press:0,vest:+10,power:-10}}},

  {id:'c53',cat:'banquillo',title:'El Micrófono Oculto',desc:'Encuentras una grabadora escondida debajo de la mesa de la oficina del entrenador.',
   a:{label:'Denunciar al míster',fx:{money:0,press:+15,vest:+5,power:-20}},
   b:{label:'Confrontarle en privado',fx:{money:0,press:0,vest:0,power:-5}}},

  {id:'c54',cat:'banquillo',title:'Dimisión en Directo',desc:'El entrenador amaga con dimitir en televisión si no le traes un fichaje ahora mismo.',
   a:{label:'Ceder y fichar',fx:{money:-25,press:+5,vest:+10,power:-5}},
   b:{label:'Aceptar su dimisión',fx:{money:-15,press:-10,vest:-5,power:+5}}},

  {id:'c55',cat:'banquillo',title:'Ley del Silencio',desc:'El míster prohíbe que nadie del club dé entrevistas. La prensa está enfurecida.',
   a:{label:'Apoyar la medida',fx:{money:0,press:-25,vest:+10,power:+10}},
   b:{label:'Abrir la comunicación',fx:{money:0,press:+15,vest:-5,power:-10}}},

  {id:'c56',cat:'banquillo',title:'El Ojeador Daltónico',desc:'Tu jefe de ojeadores confiesa que es daltónico y por eso fichó al jugador del equipo que vestía igual.',
   a:{label:'Despedirlo',fx:{money:-10,press:+5,vest:0,power:+5}},
   b:{label:'Darle otra oportunidad',fx:{money:0,press:-5,vest:0,power:-5}}},

  {id:'c57',cat:'banquillo',title:'La Manguera al Descanso',desc:'El míster pide inundar el campo en el descanso para frenar el juego rápido del rival.',
   a:{label:'Hacerlo',fx:{money:0,press:-10,vest:+10,power:+5}},
   b:{label:'Negarte',fx:{money:0,press:+5,vest:-5,power:0}}},

  {id:'c58',cat:'banquillo',title:'El Traductor Traidor',desc:'El traductor del entrenador extranjero está cambiando las respuestas para evitar polémicas.',
   a:{label:'Despedirle',fx:{money:0,press:-10,vest:0,power:+10}},
   b:{label:'Mantenerle y usarlo',fx:{money:0,press:+10,vest:0,power:-5}}},

  {id:'c59',cat:'banquillo',title:'Formación 1-2-7',desc:'El míster quiere probar una táctica suicida porque la vio funcionar en el FIFA.',
   a:{label:'Dejarlo probar',fx:{money:0,press:-5,vest:-10,power:+5}},
   b:{label:'Vetar la táctica',fx:{money:0,press:+5,vest:+5,power:-15}}},

  {id:'c60',cat:'banquillo',title:'Pelea con el Utillero',desc:'El míster ha despedido al utillero de toda la vida porque dice que transmite "mala energía".',
   a:{label:'Apoyar al míster',fx:{money:0,press:-5,vest:-5,power:+15}},
   b:{label:'Reinstalar al utillero',fx:{money:0,press:+5,vest:+10,power:-15}}},

  {id:'c61',cat:'prensa',title:'Reunión con los Ultras',desc:'Los líderes de la grada radical exigen "hablar" a solas con los jugadores tras perder el derbi.',
   a:{label:'Permitir la reunión',fx:{money:0,press:+10,vest:-15,power:-5}},
   b:{label:'Negarla',fx:{money:0,press:-15,vest:+5,power:+10}}},

  {id:'c62',cat:'prensa',title:'Trending Topic',desc:'Un video de tu capitán cayéndose borracho en una boda se hace viral en TikTok.',
   a:{label:'Sancionarlo públicamente',fx:{money:0,press:+15,vest:-15,power:+5}},
   b:{label:'Defenderlo',fx:{money:0,press:-20,vest:+10,power:-5}}},

  {id:'c63',cat:'prensa',title:'La Portada Inventada',desc:'Un periódico se inventa que tu estrella se va al máximo rival. Los fans enloquecen.',
   a:{label:'Desmentir con dureza',fx:{money:0,press:+10,vest:+10,power:+5}},
   b:{label:'No decir nada',fx:{money:0,press:-15,vest:-10,power:-5}}},

  {id:'c64',cat:'prensa',title:'Filtración del Contrato',desc:'El diario más leído publica exactamente cuánto cobra tu delantero, neto y bruto.',
   a:{label:'Denunciar la filtración',fx:{money:-10,press:0,vest:-5,power:+5}},
   b:{label:'Confirmar el salario',fx:{money:0,press:-10,vest:-5,power:-10}}},

  {id:'c65',cat:'prensa',title:'El Cántico Ofensivo',desc:'La grada canta insultos graves al árbitro. La Federación amenaza con cerrar el estadio.',
   a:{label:'Condenar públicamente',fx:{money:0,press:+15,vest:-10,power:0}},
   b:{label:'Defenderlo como cultura',fx:{money:0,press:-20,vest:+15,power:-5}}},

  {id:'c66',cat:'prensa',title:'Periodista Vetado',desc:'Un periodista muy crítico pide entrar a la rueda de prensa.',
   a:{label:'Prohibirle la entrada',fx:{money:0,press:-15,vest:0,power:+10}},
   b:{label:'Dejarle pasar',fx:{money:0,press:+10,vest:0,power:-5}}},

  {id:'c67',cat:'prensa',title:'La Pañolada',desc:'El estadio entero te pita y saca pañuelos blancos pidiendo tu dimisión.',
   a:{label:'Aguantar estoicamente',fx:{money:0,press:-10,vest:0,power:-15}},
   b:{label:'Dar rueda de prensa urgente',fx:{money:0,press:+10,vest:0,power:+5}}},

  {id:'c68',cat:'prensa',title:'Tifo Político',desc:'Los fans quieren desplegar una pancarta gigante con un mensaje político muy polémico.',
   a:{label:'Permitirlo',fx:{money:0,press:-10,vest:+15,power:-10}},
   b:{label:'Prohibirlo',fx:{money:0,press:-5,vest:-10,power:+10}}},

  {id:'c69',cat:'prensa',title:'Entrevista sin Permiso',desc:'Tu estrella da una entrevista a un streamer sin el permiso del club.',
   a:{label:'Multa y comunicado',fx:{money:+5,press:0,vest:-10,power:+10}},
   b:{label:'Ignorarlo',fx:{money:0,press:+5,vest:+5,power:-5}}},

  {id:'c70',cat:'prensa',title:'Micrófono Abierto',desc:'Te pillan diciendo en privado que los aficionados son "unos malagradecidos".',
   a:{label:'Pedir perdón públicamente',fx:{money:0,press:+10,vest:0,power:-15}},
   b:{label:'Defender tus palabras',fx:{money:0,press:-20,vest:0,power:+10}}},

  {id:'c71',cat:'prensa',title:'Amenazas en la Valla',desc:'Aparecen pintadas amenazantes en la puerta de la ciudad deportiva.',
   a:{label:'Llamar a la policía',fx:{money:0,press:+5,vest:-10,power:-5}},
   b:{label:'Callarlo internamente',fx:{money:0,press:0,vest:+5,power:+5},bomb:true}},

  {id:'c72',cat:'prensa',title:'La Claque Pagada',desc:'Te sugieren regalar entradas a un grupo de animación para que canten tu nombre.',
   a:{label:'Hacerlo',fx:{money:-15,press:+15,vest:0,power:+5}},
   b:{label:'No comprarlo',fx:{money:0,press:0,vest:0,power:0}}},

  {id:'c73',cat:'prensa',title:'Filtración del Once',desc:'Un periodista siempre sabe la alineación un día antes. ¿Pones una trampa para pillar al topo?',
   a:{label:'Trampa con once falso',fx:{money:-5,press:-5,vest:-10,power:+10}},
   b:{label:'Ignorarlo',fx:{money:0,press:-5,vest:0,power:0}}},

  {id:'c74',cat:'prensa',title:'El Meme Global',desc:'Un fallo garrafal de tu portero se convierte en el meme más usado del mundo esta semana.',
   a:{label:'Apoyar al portero',fx:{money:0,press:-5,vest:+20,power:0}},
   b:{label:'Venderle',fx:{money:+10,press:+5,vest:-15,power:0}}},

  {id:'c75',cat:'prensa',title:'Exjugador Rajón',desc:'Una leyenda del club te destruye cada semana en su programa de radio.',
   a:{label:'Invitarle a que venga',fx:{money:0,press:+10,vest:+5,power:-5}},
   b:{label:'Vetarle acceso al club',fx:{money:0,press:-15,vest:0,power:+10}}},

  {id:'c76',cat:'prensa',title:'Invasión de Campo',desc:'Un espontáneo salta al campo para abrazar a tu estrella, deteniendo un ataque rival.',
   a:{label:'Celebrarlo',fx:{money:0,press:+10,vest:+10,power:-5}},
   b:{label:'Comunicado de disculpa',fx:{money:0,press:-5,vest:0,power:+5}}},

  {id:'c77',cat:'prensa',title:'Pitada al Himno',desc:'Tu afición pita el himno del país en la final de Copa. Te exigen que los condenes.',
   a:{label:'Condenarlos',fx:{money:0,press:+15,vest:-20,power:-5}},
   b:{label:'Defenderlos',fx:{money:0,press:-20,vest:+20,power:-5}}},

  {id:'c78',cat:'prensa',title:'Boicot de Animación',desc:'Los ultras deciden estar callados todo el partido como protesta contra ti.',
   a:{label:'Reunirte con ellos',fx:{money:-5,press:+5,vest:0,power:-10}},
   b:{label:'Ignorarlo',fx:{money:0,press:-15,vest:0,power:+5}}},

  {id:'c79',cat:'prensa',title:'Venta de Humo',desc:'La prensa pide que prometas un fichaje galáctico imposible para calmar los ánimos.',
   a:{label:'Prometer el galáctico',fx:{money:0,press:+20,vest:+5,power:+10},bomb:true},
   b:{label:'Ser honesto',fx:{money:0,press:-10,vest:0,power:0}}},

  {id:'c80',cat:'prensa',title:'Cesión al Rival',desc:'La prensa revela que estás cediendo a un canterano al máximo rival. Los fans enloquecen.',
   a:{label:'Cancelar la operación',fx:{money:-15,press:+15,vest:0,power:-5}},
   b:{label:'Defender la decisión',fx:{money:+10,press:-20,vest:0,power:+5}}},

  {id:'c81',cat:'partido',title:'El Regalo al Árbitro',desc:'El delegado te pregunta si debe dejar "bolsas con camisetas" en el vestuario del árbitro.',
   a:{label:'Dejar las bolsas',fx:{money:-10,press:-10,vest:+10,power:+15},bomb:true},
   b:{label:'Nada de regalos',fx:{money:0,press:+10,vest:0,power:-5}}},

  {id:'c82',cat:'partido',title:'El VAR Roto',desc:'El monitor del VAR deja de funcionar en una jugada clave a tu favor. ¿Presionas al técnico?',
   a:{label:'Presionar para pararlo',fx:{money:0,press:-10,vest:+10,power:+5}},
   b:{label:'Dejar que decida el árbitro',fx:{money:0,press:+10,vest:0,power:-5}}},

  {id:'c83',cat:'partido',title:'Recogepelotas Pícaros',desc:'Vas ganando en el 85\'. ¿Le dices a los recogepelotas que escondan los balones?',
   a:{label:'Hacerlo',fx:{money:0,press:-10,vest:+10,power:+5}},
   b:{label:'Juego limpio',fx:{money:0,press:+10,vest:-5,power:-5}}},

  {id:'c84',cat:'partido',title:'Piscina Olímpica',desc:'Tu extremo finge un penalti y el árbitro lo pita. ¿Le pides que lo falle por juego limpio?',
   a:{label:'Que lo chute',fx:{money:0,press:-5,vest:+10,power:0}},
   b:{label:'Pedirle que lo falle',fx:{money:0,press:+20,vest:-10,power:-5}}},

  {id:'c85',cat:'partido',title:'Dopaje Sospechoso',desc:'El control antidoping da un "falso positivo" en tu mejor jugador. ¿Intentas retrasar la noticia?',
   a:{label:'Retrasar la publicación',fx:{money:-15,press:-10,vest:+5,power:+5},bomb:true},
   b:{label:'Hacer transparencia total',fx:{money:0,press:+15,vest:0,power:-5}}},

  {id:'c86',cat:'partido',title:'Aspersores Oportunos',desc:'El rival celebra su título en tu campo. ¿Enciendes los aspersores para echarlos?',
   a:{label:'Encender los aspersores',fx:{money:0,press:-15,vest:+20,power:+5}},
   b:{label:'Dejarlos celebrar',fx:{money:0,press:+15,vest:-5,power:-5}}},

  {id:'c87',cat:'partido',title:'Luces Cegadoras',desc:'El portero rival se queja de que tus focos están colocados para dejarlo ciego.',
   a:{label:'Negarlo todo',fx:{money:0,press:-10,vest:+10,power:+5}},
   b:{label:'Mover los focos',fx:{money:-5,press:+10,vest:-5,power:-5}}},

  {id:'c88',cat:'partido',title:'Tangana en el Túnel',desc:'Al pitar el final, se arma una pelea masiva en el túnel de vestuarios. ¿Dices que no viste nada?',
   a:{label:'No vi nada',fx:{money:0,press:-15,vest:+10,power:-5}},
   b:{label:'Declarar a la prensa',fx:{money:0,press:+10,vest:-10,power:+5}}},

  {id:'c89',cat:'partido',title:'El Pichichi Egoísta',desc:'Tu delantero se niega a pasarle el balón a un compañero solo para ganar la bota de oro.',
   a:{label:'Apoyar su derecho',fx:{money:+10,press:+5,vest:-20,power:0}},
   b:{label:'Alinearlo en el banquillo',fx:{money:-10,press:0,vest:+10,power:+5}}},

  {id:'c90',cat:'partido',title:'Gastroenteritis Misteriosa',desc:'Todo el equipo rival cae enfermo la noche antes del partido tras cenar en el hotel que gestiona el club. Sospechoso.',
   a:{label:'No preguntar',fx:{money:0,press:-5,vest:+5,power:+10},bomb:true},
   b:{label:'Investigar y desvincularse',fx:{money:0,press:+10,vest:0,power:-10}}},

  {id:'c91',cat:'partido',title:'La Mano de Dios',desc:'Tu capitán marca un gol con la mano que os da el campeonato. ¿Confiesas en rueda de prensa?',
   a:{label:'Confesar',fx:{money:0,press:+20,vest:-5,power:-15}},
   b:{label:'Callarse para siempre',fx:{money:0,press:-5,vest:+15,power:+5},bomb:true}},

  {id:'c92',cat:'partido',title:'El Banquillo Invasor',desc:'Todo tu banquillo salta al campo para cortar una contra letal del rival.',
   a:{label:'Defenderlos',fx:{money:-10,press:-15,vest:+20,power:-5}},
   b:{label:'Sancionarlos',fx:{money:0,press:+10,vest:-15,power:+10}}},

  {id:'c93',cat:'partido',title:'Fuego en la Grada',desc:'Los hinchas encienden bengalas y el partido se suspende por el humo.',
   a:{label:'Defenderse en público',fx:{money:-5,press:-20,vest:-5,power:-5}},
   b:{label:'Aceptar la sanción',fx:{money:-20,press:+5,vest:-5,power:-10}}},

  {id:'c94',cat:'partido',title:'El Gol Fantasma',desc:'El balón bota dentro de la portería rival, pero el árbitro dice que no entró.',
   a:{label:'Montar el escándalo',fx:{money:0,press:+5,vest:+10,power:-10}},
   b:{label:'Aceptar la decisión',fx:{money:0,press:-5,vest:-5,power:+5}}},

  {id:'c95',cat:'partido',title:'Objeto Arrojado',desc:'Lanzan un objeto desde tu grada. La Federación quiere cerrarte el estadio.',
   a:{label:'Culpar a provocadores',fx:{money:0,press:-15,vest:+10,power:+5}},
   b:{label:'Aceptar la responsabilidad',fx:{money:-20,press:+15,vest:-5,power:-10}}},

  {id:'c96',cat:'partido',title:'Descuento Infinito',desc:'El árbitro añade 10 minutos injustificados hasta que el rival empata. ¿Bajas al campo a gritarle?',
   a:{label:'Bajar a gritarle',fx:{money:-5,press:-10,vest:+20,power:-5}},
   b:{label:'Quedarte en el palco',fx:{money:0,press:0,vest:-5,power:+5}}},

  {id:'c97',cat:'partido',title:'La Bota Rota',desc:'Tu jugador marca un gol jugando descalzo porque se le rompió la bota. El rival exige anularlo.',
   a:{label:'Defender el gol',fx:{money:0,press:+10,vest:+10,power:+5}},
   b:{label:'Aceptar anularlo',fx:{money:0,press:-10,vest:-15,power:-5}}},

  {id:'c98',cat:'partido',title:'El Linier Miope',desc:'El linier no ve un fuera de juego de 3 metros y marcas gol. ¿Lo celebras?',
   a:{label:'Celebrar y seguir',fx:{money:0,press:-5,vest:+15,power:+5}},
   b:{label:'Pedir anularlo',fx:{money:0,press:+25,vest:-10,power:-10}}},

  {id:'c99',cat:'partido',title:'Césped Tramposo',desc:'El rival juega al toque. El utillero pregunta si deja el césped largo y seco para entorpecerlos.',
   a:{label:'Dejar el césped trampa',fx:{money:0,press:-10,vest:+10,power:+5}},
   b:{label:'Césped en condiciones',fx:{money:0,press:+10,vest:-5,power:-5}}},

  {id:'c100',cat:'partido',title:'La Final de Europa',desc:'El club llega a la final de la UEFA Champions League. Todo lo que hiciste llevó a este momento.',
   a:{label:'Todo por la gloria europea',fx:{money:-20,press:+50,vest:+30,power:+20},win:true},
   b:{label:'Gestión conservadora',fx:{money:+10,press:+10,vest:+5,power:+5}}}
];

/** Shield SVG path designs (viewBox 0 0 100 100) */
export const SHIELDS = [
  { id:'classic', label:'Clásico',  path:'M 50,5 L 95,20 L 95,60 Q 88,82 50,96 Q 12,82 5,60 L 5,20 Z' },
  { id:'modern',  label:'Moderno',  path:'M 5,5 L 95,5 L 95,62 L 50,95 L 5,62 Z' },
  { id:'italian', label:'Italiano', path:'M 12,5 L 88,5 L 88,66 L 50,95 L 12,66 Z' },
  { id:'round',   label:'Circular', path:'M 50,5 A 45,38 0 0 1 95,43 L 95,66 L 50,95 L 5,66 L 5,43 A 45,38 0 0 1 50,5 Z' }
];

/** 6 colour schemes – [primary, secondary] */
export const SHIELD_COLORS = [
  { id:'rw', p:'#CC2020', s:'#FFFFFF', name:'Rojo y Blanco' },
  { id:'bg', p:'#1A4BCC', s:'#FFD700', name:'Azul y Oro' },
  { id:'gk', p:'#1A7A2E', s:'#EEEEEE', name:'Verde y Plata' },
  { id:'br', p:'#111111', s:'#CC2020', name:'Negro y Rojo' },
  { id:'ps', p:'#6B3FA0', s:'#F0D050', name:'Morado y Oro' },
  { id:'ny', p:'#003399', s:'#FFCC00', name:'Marino y Amarillo' }
];

/** Manager/president personality types */
export const PRES_TYPES = [
  { name:'Tecnócrata',         desc:'Mejor en finanzas',        bonus:'money' },
  { name:'Operador oscuro',    desc:'Resiste el riesgo legal',  bonus:'power' },
  { name:'Estrella mediática', desc:'Arranca con más prensa',   bonus:'press' },
  { name:'Hombre del vestuario', desc:'Domina los egos',        bonus:'vest'  }
];

/** Unlockable achievements */
export const ACHIEVEMENTS = [
  { id:'first_title',  icon:'🏆', name:'Primera Gloria',       desc:'Gana tu primera Champions League',            check: g => g.titles.length >= 1 },
  { id:'two_titles',   icon:'🌟', name:'Leyenda de Europa',     desc:'Gana 2 Champions League',                    check: g => g.titles.length >= 2 },
  { id:'survivor',     icon:'💪', name:'Superviviente',         desc:'Llega al tercer legado',                     check: g => g.reign >= 3 },
  { id:'dynasty',      icon:'👑', name:'Dinastía',              desc:'Alcanza el quinto legado',                   check: g => g.reign >= 5 },
  { id:'honest',       icon:'🤝', name:'Manos Limpias',         desc:'Rechaza 5 ofertas corruptas',                check: g => g.track.corruptRejected >= 5 },
  { id:'corrupt',      icon:'💰', name:'Negocios Sucios',       desc:'Acepta 5 decisiones turbias',                check: g => g.track.corruptAccepted >= 5 },
  { id:'press_king',   icon:'📰', name:'El Relaciones',         desc:'Consigue +10 de prensa en una sola jugada',  check: g => g.track.bestPressDelta >= 10 },
  { id:'banker',       icon:'🏦', name:'El Banquero',           desc:'Llega a 90 de dinero',                       check: g => g.stats.money >= 90 },
  { id:'century',      icon:'💯', name:'Centenario',            desc:'Juega 100 turnos en total',                  check: g => g.track.totalTurns >= 100 },
  { id:'iron_fist',    icon:'👊', name:'Puño de Hierro',        desc:'Llega a 90 de poder',                        check: g => g.stats.power >= 90 }
];

/** Nicknames (motes) earned at the end of each legacy */
export const MOTES = [
  { id:'corrupto',      name:'el Corrupto',           check: g => g.track.legCorruptAccepted > g.track.legCorruptRejected && g.track.legCorruptAccepted >= 3 },
  { id:'honrado',       name:'el Honrado',             check: g => g.track.legCorruptRejected >= 4 && g.track.legCorruptAccepted === 0 },
  { id:'populista',     name:'el Populista',           check: g => g.track.legPressFriendly >= 6 },
  { id:'tirano',        name:'el Tirano',              check: g => g.track.legPowerChoices >= 7 && g.track.legVestSanctions >= 4 },
  { id:'padre',         name:'el Padre del Vestuario', check: g => g.track.legVestFriendly >= 6 && g.track.legVestSanctions < 2 },
  { id:'tacano',        name:'el Tacaño',              check: g => g.stats.money >= 75 && g.track.legPressFriendly < 3 },
  { id:'galactico',     name:'el Galáctico',           check: g => g.titles.length >= 1 && g.track.legCorruptRejected >= 2 },
  { id:'impresentable', name:'el Impresentable',       check: () => false } // fallback on catastrophic loss
];
