const Alexa = require('ask-sdk-core');
const moment = require('moment-timezone');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const GIVEN_NAME_PERMISSION = ['alexa::profile:given_name:read'];
const  welcome= "welcome";
const componet ="componet";
let error="error";
let errorAPL="error";
let fechaXantolo="El 31 de Octubre y finaliza el 2 de noviembre";
let bienvenida = 'https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/tipos.JPG?alt=media&token=eb3cb9b2-304e-4ab4-b5e7-e462906bf22b'
let logo = 'https://corazon-huasteco.com/assets/imgLogoHuejutlaLight-826e16fa.png'
const languageStrings = {
  'en': {
     translation: {
      pregunta: `Is there anything else I can help you with? If not, say goodbye to end the skill.`,
      welcome: `%s, Welcome to Corazón Huasteco!`,
      puedesDecirme: `You can say: "Tell me about tamales" or "When is Semana Santa celebrated?" or ask me: "How much time is left for Shantolo?"`,
      inicia: `%s, %s starts`,
      falta: `%s, for the %s.`,
      fechaNoMes: `There are %s days left.`,
      FechaMes: `There are %s months and %s days left.`,
      titulo: `%s, The catalog of %s is:`,
      losTitulos: `%s, The titles in the catalog %s are: %s, %s`,
      error: `%s, I'm sorry, there is no catalog named %s`,
      error2: `%s, I'm sorry, there is no category called %s`,
      dato: `%s, A curious fact about %s could be:`,
      noDato: `%s, I no longer have any curious facts about %s`,
      otro: `If you want to know another fact about %s, say "next," otherwise say "no."`,
      antes: `If you want to know the previous fact about %s, say "back," otherwise say "no."`,
      cuandoFesteja: `when is the Xantolo celebration`,
      cuantoFaltaFestividad: `how much time is left for the national holidays`,
      mostrarCatalogo: `show me the catalog of products`,
      dameDato: `tell me about Xantolo`,
      prueba: `Try saying`,
      noCrearRecordatorio: `%s, the reminder could not be created`,
      noSoporta: `but the device does not support reminder use`,
      creadoRecordatorio: `%s, A reminder has been created for %s where I will remind you %s weeks before the celebration.`,
      debes: `%s, You must enable reminder permissions to create one.`,
      recordar: `%s, I remind you that there are %s weeks left until %s starts`,
      cuesta: `%s, %s costs: `,
      mensajeRecordatorio: `Remember the celebration %s that will take place on %s-%s, %s weeks away.`,
      UNSUPPORTED_DEVICE_MSG: `This device does not support the operation you are trying to perform. `,
      REMINDER_ERROR_MSG: `There was an error creating the reminder. `,
      MISSING_PERMISSION_MSG: `It seems you haven't authorized the skill to send reminders. I have sent you a card in the Alexa app to enable it. `,
      quieres: `Would you like to receive a reminder to inform you that the date is approaching? If so, please respond with "set a reminder." If you're not interested, respond with "goodbye" to finish setting up the reminder.`,
      ayuda: `I can provide information about festivities, gastronomy, clothing, dance, and music from Huejutla de Reyes, Hidalgo. I can also tell you about the products sold by Corazón Huasteco.`
    }
  },
  'es': {
    translation: {
     pregunta : `¿Hay algo más en lo que pueda ayudarte?, de no ser asi di adios para terminar la skill`,
     welcome : `%s, Bienvenido a Corazón Huasteco!`,
     puedesDecirme: `Puedes decirme: "Hablame sobre los tamales" o "¿Cuando se festeja la semana santa?" o preguntarme: ¿Cuanto falta para Xantolo?`,
     inicia: `%s, %s inicia`,
     falta:`%s, Para %s`,
     fechaNoMes : `Faltan %s días.`,
     FechaMes: `Faltan %s  meses y %s días.`,
     titulo: `%s, el catalogo de %s es: `,
     losTitulos: `%s, Los títulos del catálogo %s son: %s, %s`,
     error:`%s, Lo siento, no hay un catálogo llamado %s`,
     error2:`%s, Lo siento, no hay una categoría llamada %s`,
     dato: `%s, Un dato curioso de %s podria ser:`,
     noDato: `%s, ya no cuento con datos curisos de %s`,
     otro: `Si quieres saber otro dato sobre %s di siguiente, de no ser asi di no`,
     antes: `Si quieres saber el dato anterior sobre %s di regresar, de no ser asi di no`,
     cuandoFesteja: `cuando se festeja el xantolo`,
     cuantoFaltaFestividad: `cuanto fala para las fiestas patrias`,
     mostrarCatalogo:`muestra me el catalogo de los productos`,
     dameDato: `hablame sobre el xantolo`,
     prueba: `Prueba diciendo`,
     noCrearRecordatorio:`%s, no se logro crear el recordatorio`,
     noSoporta: `pero el dispositivo no soporta el uso de recordatorios`,
     creadoRecordatorio :`%s, Se ha creado un recordatorio para %s donde te recordare $s semanas de su festejo.`,
     debes:'%s, Debes habilitar los permisos de recordatorios para poder crear uno.',
     recordar:`%s, Te recuerdo que faltan %s semanas para que inicie %s`,
     cuesta: "%s, %s cuesta: ",
     mensajeRecordatorio: `Recuerda la festividad %s que se celebrará el %s-%s faltan %s semanas.`,
     UNSUPPORTED_DEVICE_MSG: 'Este dispositivo no soporta la operación que estás intentando realizar. ',
     REMINDER_ERROR_MSG: 'Ha habido un error al crear el recordatorio. ',
     MISSING_PERMISSION_MSG: 'Parece que no has autorizado a la skill para enviar recordatorios. Te he enviado una tarjeta a la app Alexa para que lo habilites. ',
     quieres:`¿Te gustaría recibir un recordatorio para informarte que se acerca esa fecha? Si es así, por favor responde con "crea un recordatorio". Si no estás interesado, responde con "adios" para finalizar la configuración del recordatorio.`,
     ayuda: `Puedo proporcionarte informacion sobre festividades, gastronomia, vestimanta, danza, musica de Huejutla de Reyes Hidalgo asi mismo puedo decirte los productos que vende Corazon Huasteco `,
     despedida: `¡Adiós %s! Regresa cuando quieras saber otro dato curioso de Huejutla de Reyes Hidalgo.`
    }
  }
};
let speakOutput='';
const festividades = {
  "fiesta del tordo": {
    nombre: "la Fiesta del Tordo",
    fecha_corta: "20-05",
    fecha_larga: "el 20 de mayo",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Ftordo.jpg?alt=media&token=09046f58-261e-45c1-a306-b08d1714e1b4",
    dato_curioso_1: "La Fiesta del Tordo es una celebración tradicional en la Huasteca Hidalguense.",
    dato_curioso_2: "Durante esta fiesta, se realizan competencias de tiro al blanco con escopeta para cazar tordos.",
    dato_curioso_3: "La Fiesta del Tordo es una oportunidad para reunirse con familiares y amigos, disfrutar de la comida típica y celebrar la cultura huasteca.",
    activa: "tordo"
  },
  "fiestas patrias": {
    nombre: "las Fiestas Patrias",
    fecha_corta: "15-09",
    fecha_larga: "el 15 de septiembre",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fpatrias.jpg?alt=media&token=2b1eec4d-de9d-4c03-ae50-656d231bd744",
    dato_curioso_1: "Las Fiestas Patrias son una celebración importante en la Huasteca Hidalguense para conmemorar la independencia de México.",
    dato_curioso_2: "Durante estas festividades, se realizan desfiles, eventos cívicos y se exhiben trajes típicos.",
    dato_curioso_3: "Las Fiestas Patrias son una oportunidad para mostrar el orgullo nacional y promover la cultura mexicana en la comunidad huasteca.",
    activa: "patrias"
  },
  "feria nochebuena": {
    nombre: "la Feria Nochebuena",
    fecha_corta: "20-12",
    fecha_larga: "el 20 de diciembre",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fferia.jpg?alt=media&token=cc32dcff-a0d6-4bec-a062-7236aceb038c",
    dato_curioso_1: "La Feria Nochebuena es una festividad que se celebra en vísperas de la Navidad en la Huasteca Hidalguense.",
    dato_curioso_2: "Durante esta feria, se realizan conciertos, juegos mecánicos y se ofrecen diversos productos artesanales y gastronómicos.",
    dato_curioso_3: "La Feria Nochebuena es una oportunidad para disfrutar de la diversión y el espíritu festivo previo a la Navidad en la comunidad huasteca.",
    activa: "nochebuena"
  },
  "semana santa": {
    nombre: "la Semana Santa",
    dia: "24-03",
    fecha_larga: "el 24 de marzo",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fsemana_santa.jpg?alt=media&token=3876d2c4-b16a-4db0-8f58-fc4fb3263d24",
    dato_curioso_1: "La Semana Santa es una tradición religiosa muy importante en la Huasteca Hidalguense.",
    dato_curioso_2: "Durante esta semana, se realizan procesiones, representaciones de la Pasión de Cristo y otros rituales religiosos.",
    dato_curioso_3: "La Semana Santa es un momento de reflexión y devoción para la comunidad huasteca.",
    activa: "semana"
  },
  "xantolo": {
    nombre: "el Xantolo",
    fecha_corta: "31-10",
    fecha_larga: "EL 31 de octubre",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fpanteon.jpg?alt=media&token=2f2532c5-ebd3-4a22-8cb3-b69ccc6ca8ab",
    dato_curioso_1: "El Xantolo, también conocido como el Día de los Muertos, es una festividad tradicional en la Huasteca Hidalguense.",
    dato_curioso_2: "Durante el Xantolo, se realizan altares en honor a los difuntos, se visitan los cementerios y se llevan a cabo danzas y música tradicional.",
    dato_curioso_3: "Esta festividad es una mezcla de elementos prehispánicos y católicos, y tiene como objetivo honrar a los seres queridos fallecidos.",
    activa: "xanto"
  },
  "guadalupana": {
    nombre: "la Guadalupana",
    fecha_corta: "18-12",
    fecha_larga: "el 18 de diciembre",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fguadalupana2.jpg?alt=media&token=e0065bd0-6465-418e-941f-122431712641",
    dato_curioso_1: "Las Guadalupanas son una tradición religiosa en la Huasteca Hidalguense que celebra a la Virgen de Guadalupe.",
    dato_curioso_2: "Durante el mes de diciembre, se realizan peregrinaciones y festividades en honor a la Virgen.",
    dato_curioso_3: "Las Guadalupanas son reconocidas por sus trajes tradicionales, que incluyen vestidos azules, mantillas y rosarios.",
    activa: "guada"
  },
  "carnaval": {
    nombre: "el Carnaval",
    fecha_corta: "08-02",
    fecha_larga: "el 08 de febrero",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fcarnaval.jpg?alt=media&token=861b6e9f-2e59-43a8-a28b-46f62d43d2c9",
    dato_curioso_1: "El Carnaval es una festividad popular en la Huasteca Hidalguense, llena de color, música y bailes.",
    dato_curioso_2: "Durante el Carnaval, se realizan desfiles con carros alegóricos, se visten trajes elaborados y se llevan a cabo concursos de disfraces.",
    dato_curioso_3: "Esta celebración es una oportunidad para la diversión y la alegría en la comunidad huasteca.",
    activa: "carnaval"
  }
};
const festivities = {
  "tordo festival": {
    "nombre": "Tordo Festival",
    "fecha_corta": "20-05",
    "fecha_larga": "May 20th",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Ftordo.jpg?alt=media&token=09046f58-261e-45c1-a306-b08d1714e1b4",
    "dato_curioso_1": "The Tordo Festival is a traditional celebration in the Huasteca Hidalguense.",
    "dato_curioso_2": "During this festival, there are shotgun shooting competitions to hunt tordos.",
    "dato_curioso_3": "The Tordo Festival is an opportunity to gather with family and friends, enjoy typical food, and celebrate Huastecan culture.",
    "activa": "tordo"
  },
  "patrotic festivities": {
    "nombre": "Patriotic Festivities",
    "fecha_corta": "15-09",
    "fecha_larga": "September 15th",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fpatrias.jpg?alt=media&token=2b1eec4d-de9d-4c03-ae50-656d231bd744",
    "dato_curioso_1": "The Patriotic Festivities are an important celebration in the Huasteca Hidalguense to commemorate Mexico's independence.",
    "dato_curioso_": "During these festivities, there are parades, civic events, and displays of traditional costumes.",
    "dato_curioso_3": "The Patriotic Festivities are an opportunity to showcase national pride and promote Mexican culture in the Huastecan community.",
    "activa": "patrias"
  },
  "nochebuena fair": {
    "nombre": "Nochebuena Fair",
    "fecha_corta": "20-12",
    "fecha_larga": "December 20th",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fferia.jpg?alt=media&token=cc32dcff-a0d6-4bec-a062-7236aceb038c",
    "dato_curioso_1": "The Nochebuena Fair is a festivity celebrated on Christmas Eve in the Huasteca Hidalguense.",
    "dato_curioso_2": "During this fair, there are concerts, amusement rides, and various artisanal and gastronomic products are offered.",
    "dato_curioso_3": "The Nochebuena Fair is an opportunity to enjoy fun and festive spirit before Christmas in the Huastecan community.",
    "activa": "nochebuena"
  },
  "holy week": {
    "nombre": "Holy Week",
    "fecha_corta": "24-03",
    "fecha_larga": "March 24th",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fsemana_santa.jpg?alt=media&token=3876d2c4-b16a-4db0-8f58-fc4fb3263d24",
    "dato_curioso_1": "Holy Week is a very important religious tradition in the Huasteca Hidalguense.",
    "dato_curioso_2": "During this week, processions, representations of the Passion of Christ, and other religious rituals take place.",
    "dato_curioso_3": "Holy Week is a time of reflection and devotion for the Huastecan community.",
    "activa": "semana"
  },
  "xantolo": {
    "nombre": "Xantolo",
    "fecha_corta": "31-10",
    "fecha_larga": "October 31st",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fpanteon.jpg?alt=media&token=2f2532c5-ebd3-4a22-8cb3-b69ccc6ca8ab",
    "dato_curioso_1": "Xantolo, also known as the Day of the Dead, is a traditional festivity in the Huasteca Hidalguense.",
    "dato_curioso_2": "During Xantolo, altars are made to honor the deceased, cemeteries are visited, and traditional dances and music are performed.",
    "dato_curioso_3": "This celebration is a blend of pre-Hispanic and Catholic elements and aims to honor departed loved ones.",
    "activa": "xanto"
  },
  "guadalupana": {
    "nombre": "Guadalupana",
    "fecha_corta": "18-12",
    "fecha_larga": "December 18th",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fguadalupana2.jpg?alt=media&token=e0065bd0-6465-418e-941f-122431712641",
    "dato_curioso_1": "The Guadalupanas are a religious tradition in the Huasteca Hidalguense that celebrates the Virgin of Guadalupe.",
    "dato_curioso_2": "During December, pilgrimages and festivities are held in honor of the Virgin.",
    "dato_curioso_3": "The Guadalupanas are recognized for their traditional attire, which includes blue dresses, mantillas, and rosaries.",
    "activa": "guada"
  },
  "carnaval": {
    "nombre": "carnaval",
    "fecha_corta": "08-02",
    "fecha_larga": "February 8th",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fcarnaval.jpg?alt=media&token=861b6e9f-2e59-43a8-a28b-46f62d43d2c9",
    "dato_curioso_1": "The Carnival is a popular festivity in the Huasteca Hidalguense, full of colors, music, and dances.",
    "dato_curioso_2": "During the Carnival, there are parades with allegorical floats, elaborate costumes, and costume contests.",
    "dato_curioso_3": "This celebration is an opportunity for fun and joy in the Huastecan community.",
    "activa": "carnaval"
  }
};
const gastronomia = {
  "tamales": {
    dato_curioso_1: "Los tamales son una comida típica de la Huasteca Hidalguense, preparados con masa de maíz y diversos rellenos",
    dato_curioso_2: "Se envuelven en hojas de plátano y se cocinan al vapor",
    dato_curioso_3: "Los tamales huastecos suelen ser más grandes que los tamales de otras regiones de México",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Ftamales.jpg?alt=media&token=35948030-2160-4645-a7aa-b44900def9ba"
  },
  "atole agrio": {
    dato_curioso_1: "El atole agrio es una bebida tradicional de la Huasteca Hidalguense hecha a base de maíz fermentado",
    dato_curioso_2: "Tiene un sabor ligeramente ácido y se endulza con piloncillo o azúcar",
    dato_curioso_3: "El atole agrio se considera refrescante y se consume especialmente durante el verano",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fatole.jpg?alt=media&token=049ead52-f5c7-474e-9ca7-4f743db821e5"
  },
  "capeado": {
    dato_curioso_1: "El capeado es una técnica culinaria común en la Huasteca Hidalguense, que consiste en rebozar alimentos en una mezcla de harina y huevo",
    dato_curioso_2: "Luego se fríen en aceite caliente hasta que queden dorados y crujientes",
    dato_curioso_3: "El capeado se utiliza para preparar diversos platillos como chiles rellenos, camarones y pescados",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fcapeado.jpg?alt=media&token=b635d956-6929-4a60-8a82-41c636be75fc"
  },
  "zacahuil": {
    dato_curioso_1: "El zacahuil es un platillo emblemático de la Huasteca Hidalguense, considerado uno de los tamales más grandes de México",
    dato_curioso_2: "Se elabora con masa de maíz rellena de carne de cerdo adobada, envuelta en hojas de plátano y cocido al horno",
    dato_curioso_3: "El zacahuil es tradicionalmente preparado para festividades y celebraciones especiales",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fzacahuil.jpg?alt=media&token=e9717c76-21a6-4b22-9d86-9ce98a202698"
  },
  "xojol": {
    dato_curioso_1: "El xojol es un postre tradicional de la Huasteca Hidalguense hecho a base de maíz tierno y piloncillo.",
    dato_curioso_2: "Se cuece lentamente hasta obtener una consistencia similar a una jalea",
    dato_curioso_3: "El xojol se consume solo o como acompañamiento de otros postres típicos",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fxohol.jpg?alt=media&token=fef4fa2f-fa62-4ef2-8756-3588cd71f87f"
  },
  "carnitas de puerco": {
    dato_curioso_1: "Las carnitas de puerco son un platillo popular en la Huasteca Hidalguense, consisten en trozos de carne de cerdo cocidos lentamente en su propia grasa hasta que estén tiernos y crujientes",
    dato_curioso_2: "Se sirven tradicionalmente con tortillas calientes, salsa y guarniciones como cebolla, cilantro y limón",
    dato_curioso_3: "Las carnitas de puerco son un elemento clave en celebraciones y fiestas en la región",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fcarnitas.jpg?alt=media&token=c44df025-7e34-4dc3-af44-4b0ed257f276"
  },
  "barbacoa de res": {
    dato_curioso_1: "La barbacoa de res es un platillo tradicional de la Huasteca Hidalguense, se prepara cocinando lentamente la carne de res envuelta en hojas de maguey en un horno subterráneo",
    dato_curioso_2: "El proceso de cocción lento y a baja temperatura resulta en una carne jugosa y llena de sabor",
    dato_curioso_3: "La barbacoa de res se sirve en tacos o consomé y es una delicia culinaria muy apreciada",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fbarbacoa.jpg?alt=media&token=0afc8370-abcf-444f-a62b-b64311be6239"
  },
  "mole verde y rojo": {
    dato_curioso_1: "El mole verde y rojo son salsas típicas de la Huasteca Hidalguense",
    dato_curioso_2: "El mole verde se prepara con ingredientes como pepitas, hierbas, chiles y especias, resultando en un sabor fresco y ligeramente picant.",
    dato_curioso_3: "El mole rojo se elabora con chiles secos, especias y chocolate, creando una salsa rica y ligeramente dulce",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fmole.jpg?alt=media&token=73014a76-fa5b-4928-b7a5-2d4aa705502c"
  },
  "enchiladas": {
    dato_curioso_1: "Las enchiladas son un platillo común en la Huasteca Hidalguense, consisten en tortillas de maíz rellenas de carne, queso, pollo o frijoles, y se bañan en una salsa picante",
    dato_curioso_2: "Se suelen servir con lechuga, crema, queso fresco y cebolla, y pueden variar en nivel de picante según la preferencia del comensal",
    dato_curioso_3: "Las enchiladas son un elemento básico en la gastronomía de la región y se disfrutan en diversas ocasiones",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fenchiladas.jpg?alt=media&token=f1056d11-fc87-4d81-b0b5-c1c343a15a1e"
  },
  "bocoles": {
    dato_curioso_1: "Los bocoles son una especialidad culinaria de la Huasteca Hidalguense, se preparan con masa de maíz y se cuecen en comal",
    dato_curioso_2: "Suelen tener forma redonda y se pueden rellenar con diversos ingredientes como frijoles, queso, carne o chicharrón",
    dato_curioso_3: "Los bocoles se acompañan con salsa, guacamole y crema, y son una opción deliciosa para el desayuno o la cena",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fgastronomia.jpg?alt=media&token=e15847a5-f305-4be7-8095-ca319a73592d"
  }
};
const gastronomy = {
  "tamales": {
    "dato_curioso_1": "Tamales are a typical food of the Huasteca Hidalguense, prepared with corn masa and various fillings.",
    "dato_curioso_2": "They are wrapped in banana leaves and cooked by steaming.",
    "dato_curioso_3": "Huastecan tamales are usually larger than tamales from other regions of Mexico.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Ftamales.jpg?alt=media&token=35948030-2160-4645-a7aa-b44900def9ba"
  },
  "atole agrio": {
    "dato_curioso_1": "Atole agrio is a traditional beverage of the Huasteca Hidalguense made from fermented corn.",
    "dato_curioso_2": "It has a slightly sour taste and is sweetened with piloncillo or sugar.",
    "dato_curioso_3": "Atole agrio is considered refreshing and is especially consumed during the summer.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fatole.jpg?alt=media&token=049ead52-f5c7-474e-9ca7-4f743db821e5"
  },
  "capeado": {
    "dato_curioso_1": "Capeado is a common culinary technique in the Huasteca Hidalguense, which involves coating foods in a mixture of flour and egg.",
    "dato_curioso_2": "They are then fried in hot oil until they are golden and crispy.",
    "dato_curioso_3": "Capeado is used to prepare various dishes such as stuffed peppers, shrimp, and fish.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fcapeado.jpg?alt=media&token=b635d956-6929-4a60-8a82-41c636be75fc"
  },
  "zacahuil": {
    "dato_curioso_1": "Zacahuil is an emblematic dish of the Huasteca Hidalguense, considered one of the largest tamales in Mexico.",
    "dato_curioso_2": "It is made with corn masa filled with marinated pork, wrapped in banana leaves, and baked in an oven.",
    "dato_curioso_3": "Zacahuil is traditionally prepared for special festivities and celebrations.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fzacahuil.jpg?alt=media&token=e9717c76-21a6-4b22-9d86-9ce98a202698"
  },
  "xojol": {
    "dato_curioso_1": "Xojol is a traditional dessert from the Huasteca Hidalguense made from young corn and piloncillo.",
    "dato_curioso_2": "It is slowly cooked until it reaches a jelly-like consistency.",
    "dato_curioso_3": "Xojol is consumed on its own or as an accompaniment to other typical desserts.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fxohol.jpg?alt=media&token=fef4fa2f-fa62-4ef2-8756-3588cd71f87f"
  },
  "carnitas de puerco": {
    "dato_curioso_1": "Carnitas de puerco are a popular dish in the Huasteca Hidalguense, consisting of pork pieces cooked slowly in their own fat until they are tender and crispy.",
    "dato_curioso_2": "They are traditionally served with warm tortillas, salsa, and garnishes such as onions, cilantro, and lime.",
    "dato_curioso_3": "Carnitas de puerco are a key element in celebrations and parties in the region.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fcarnitas.jpg?alt=media&token=c44df025-7e34-4dc3-af44-4b0ed257f276"
  },
  "barbacoa de res": {
    "dato_curioso_1": "Barbacoa de res is a traditional dish of the Huasteca Hidalguense, prepared by slow-cooking beef wrapped in maguey leaves in an underground oven.",
    "dato_curioso_2": "The slow and low-temperature cooking process results in juicy and flavorful meat.",
    "dato_curioso_3": "Barbacoa de res is served in tacos or consommé and is a highly appreciated culinary delight.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fbarbacoa.jpg?alt=media&token=0afc8370-abcf-444f-a62b-b64311be6239"
  },
  "mole verde y rojo": {
    "dato_curioso_1": "Mole verde and mole rojo are typical sauces from the Huasteca Hidalguense.",
    "dato_curioso_2": "Mole verde is prepared with ingredients such as pumpkin seeds, herbs, chilies, and spices, resulting in a fresh and slightly spicy flavor.",
    "dato_curioso_3": "Mole rojo is made with dried chilies, spices, and chocolate, creating a rich and slightly sweet sauce.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fmole.jpg?alt=media&token=73014a76-fa5b-4928-b7a5-2d4aa705502c"
  },
  "enchiladas": {
    "dato_curioso_1": "Enchiladas are a common dish in the Huasteca Hidalguense, consisting of corn tortillas filled with meat, cheese, chicken, or beans, and topped with a spicy sauce.",
    "dato_curioso_2": "They are usually served with lettuce, cream, fresh cheese, and onions, and can vary in spiciness according to the diner's preference.",
    "dato_curioso_3": "Enchiladas are a staple in the region's cuisine and are enjoyed on various occasions.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fenchiladas.jpg?alt=media&token=f1056d11-fc87-4d81-b0b5-c1c343a15a1e"
  },
  "bocoles": {
    "dato_curioso_1": "Bocoles are a culinary specialty of the Huasteca Hidalguense, made with corn masa and cooked on a comal.",
    "dato_curioso_2": "They are usually round in shape and can be filled with various ingredients such as beans, cheese, meat, or chicharrón.",
    "dato_curioso_3": "Bocoles are served with salsa, guacamole, and cream, and are a delicious option for breakfast or dinner.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fgastronomia.jpg?alt=media&token=e15847a5-f305-4be7-8095-ca319a73592d"
  }
};
const danza = {
  "Achmichtinij": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Fdanza_pececillos.jpg?alt=media&token=bf84d2b5-fd2c-4998-828d-d0c4c6356e32",
    dato_curioso_1: "El Achmichtinij es una danza tradicional de la Huasteca Hidalguense que representa la lucha entre el bien y el mal",
    dato_curioso_2: "Durante el Achmichtinij, los bailarines utilizan máscaras coloridas y movimientos acrobáticos",
    dato_curioso_3: "Esta danza es conocida por su energía y vitalidad"
  },
  "Cuaxompiates": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Fautotonas.jpg?alt=media&token=6867187a-d5a5-4651-b0a7-be95bf1ef0fb",
    dato_curioso_1: "Los Cuaxompiates son una danza ceremonial sagrada de la Huasteca Hidalguense que rinde homenaje a los dioses",
    dato_curioso_2: "Esta danza se caracteriza por los movimientos lentos y elegantes de los bailarines",
    dato_curioso_3: "Los trajes utilizados en los Cuaxompiates son elaborados y están adornados con plumas y bordados"
  },
  "Cuapatlantinij": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Fpalo_volador.jpg?alt=media&token=11f7f331-9a85-4618-a7e5-badd32815491",
    dato_curioso_1: "El Cuapatlantinij es un baile tradicional de la Huasteca Hidalguense que celebra la fertilidad y la abundancia",
    dato_curioso_2: "Durante el Cuapatlantinij, los bailarines llevan en sus manos ramas y flores, simbolizando la conexión con la naturaleza",
    dato_curioso_3: "Esta danza es alegre y enérgica, con movimientos rápidos y saltos"
  },
  "Xochihualiztli": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Ftres_colores.jpg?alt=media&token=e87f2133-140b-41cb-b5ee-6b7108719889",
    dato_curioso_1: "El Xochihualiztli es una danza floral de la Huasteca Hidalguense que honra a la naturaleza y las cosechas",
    dato_curioso_2: "Los bailarines visten trajes decorados con flores y llevan guirnaldas en las manos",
    dato_curioso_3: "Esta danza evoca la belleza y el esplendor de los campos florecidos de la región"
  }
};
const dance = {
  "Achmichtinij": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Fdanza_pececillos.jpg?alt=media&token=bf84d2b5-fd2c-4998-828d-d0c4c6356e32",
    "dato_curioso_1": "Achmichtinij is a traditional dance from the Huasteca Hidalguense that represents the struggle between good and evil.",
    "dato_curioso_2": "During Achmichtinij, dancers use colorful masks and perform acrobatic movements.",
    "dato_curioso_3": "This dance is known for its energy and vitality."
  },
  "Cuaxompiates": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Fautotonas.jpg?alt=media&token=6867187a-d5a5-4651-b0a7-be95bf1ef0fb",
    "dato_curioso_1": "Cuaxompiates are a sacred ceremonial dance from the Huasteca Hidalguense that pays homage to the gods.",
    "dato_curioso_2": "This dance is characterized by slow and elegant movements by the dancers.",
    "dato_curioso_3": "The costumes used in Cuaxompiates are elaborate and adorned with feathers and embroideries."
  },
  "Cuapatlantinij": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Fpalo_volador.jpg?alt=media&token=11f7f331-9a85-4618-a7e5-badd32815491",
    "dato_curioso_1": "Cuapatlantinij is a traditional dance from the Huasteca Hidalguense that celebrates fertility and abundance.",
    "dato_curioso_2": "During Cuapatlantinij, dancers hold branches and flowers in their hands, symbolizing their connection with nature.",
    "dato_curioso_3": "This dance is joyful and energetic, with fast movements and jumps."
  },
  "Xochihualiztli": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Ftres_colores.jpg?alt=media&token=e87f2133-140b-41cb-b5ee-6b7108719889",
    "dato_curioso_1": "Xochihualiztli is a floral dance from the Huasteca Hidalguense that honors nature and the harvest.",
    "dato_curioso_2": "Dancers wear costumes decorated with flowers and carry garlands in their hands.",
    "dato_curioso_3": "This dance evokes the beauty and splendor of the blooming fields in the region."
  }
};
const music = {
  "sinfonias de jesus": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    "dato_curioso_1": "Sinfonías de Jesús están pasando por aquí is a famous musical piece from the Huasteca Hidalguense.",
    "dato_curioso_2": "This melody is played with instruments such as violin, huapanguera guitar, and jarana huasteca.",
    "dato_curioso_3": "The music of Sinfonías de Jesús están pasando por aquí is joyful and infectious, and is played during festivities and special events."
  },
  "bendito sea dios": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    "dato_curioso_1": "Bendito sea Dios is a traditional song from the Huasteca Hidalguense, known for its devotional lyrics and melancholic melody.",
    "dato_curioso_2": "The song is performed with traditional instruments such as violin, huapanguera guitar, and jarana huasteca.",
    "dato_curioso_3": "Bendito sea Dios is heard on various occasions, from religious events to family gatherings."
  },
  "el canario": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    "dato_curioso_1": "El Canario is a popular traditional song from the Huasteca Hidalguense, recognized for its lively and catchy rhythm.",
    "dato_curioso_2": "This song is performed with instruments such as violin, huapanguera guitar, and jarana huasteca.",
    "dato_curioso_3": "El Canario is a joyful melody that invites people to dance and enjoy the huasteca music."
  },
  "Xochipitzahua": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    "dato_curioso_1": "Xochipitzahua is a beautiful traditional melody from the Huasteca Hidalguense.",
    "dato_curioso_2": "This song evokes the beauty of nature and the flowers in the region.",
    "dato_curioso_3": "Xochipitzahua is performed with instruments such as violin, huapanguera guitar, and jarana huasteca."
  }
};
const musica = {
  "sinfonias de jesus": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    dato_curioso_1: "Las Sinfonías de Jesús están pasando por aquí es una famosa pieza musical de la Huasteca Hidalguense",
    dato_curioso_2: "Esta melodía es interpretada con instrumentos como el violín, guitarra huapanguera y jarana huasteca",
    dato_curioso_3: "La música de las Sinfonías de Jesús están pasando por aquí es alegre y contagiosa, y se toca en festividades y eventos especiales"
  },
  "bendito sea dios": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    dato_curioso_1: "Bendito sea Dios es una canción tradicional de la Huasteca Hidalguense, conocida por su letra devocional y melodía melancólica",
    dato_curioso_2: "La canción es interpretada con instrumentos tradicionales como el violín, guitarra huapanguera y jarana huasteca",
    dato_curioso_3: "Bendito sea Dios se escucha en diversas ocasiones, desde eventos religiosos hasta reuniones familiares"
  },
  "el canario": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    dato_curioso_1: "El Canario es una popular canción tradicional de la Huasteca Hidalguense, reconocida por su ritmo animado y pegajoso",
    dato_curioso_2: "Esta canción es interpretada con instrumentos como el violín, guitarra huapanguera y jarana huasteca",
    dato_curioso_3: "El Canario es una melodía alegre que invita a bailar y disfrutar de la música huasteca"
  },
  "Xochipitzahua": {
    url:"https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ficono.jpg?alt=media&token=5fdec6ab-6a8f-4caa-bbf5-e46baffe56dd",
    dato_curioso_1: "Xochipitzahua es una hermosa melodía tradicional de la Huasteca Hidalguense",
    dato_curioso_2: "Esta canción evoca la belleza de la naturaleza y las flores de la región",
    dato_curioso_3: "Xochipitzahua se interpreta con instrumentos como el violín, guitarra huapanguera y jarana huasteca"
  }
};
const vestimenta = {
  "traje regional": {
    dato_curioso_1: "El traje regional de la Huasteca Hidalguense es colorido y elaborado, reflejando la rica cultura y tradiciones de la región",
    dato_curioso_2: "Los trajes regionales suelen incluir blusas bordadas, faldas amplias, rebozos y sombreros decorados",
    dato_curioso_3: "Cada localidad de la Huasteca Hidalguense tiene sus propias variantes y estilos de trajes regionales",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Vestimenta%2FTraje%20tipico%2Ftraje%20tipico%201.jpeg?alt=media&token=b7999bb5-5143-4712-bdb1-ec9e903d0289"
    
  },
  "traje de boda huasteco": {
    dato_curioso_1: "El traje de boda huasteco es un atuendo tradicional usado en las ceremonias matrimoniales de la Huasteca Hidalguense",
    dato_curioso_2: "El traje de boda huasteco para las mujeres incluye faldas largas y amplias, blusas bordadas y rebozos",
    dato_curioso_3: "Para los hombres, el traje de boda huasteco puede incluir pantalones blancos, camisas bordadas y sombreros",
    url: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Vestimenta%2FTraje%20de%20boda%2Fboda3.jpg?alt=media&token=06af4e91-6866-4b25-8cbf-ab1636990cce"
  }
};
const clothing = {
  "traje regional": {
    "dato_curioso_1": "The regional clothing of the Huasteca Hidalguense is colorful and elaborate, reflecting the rich culture and traditions of the region.",
    "dato_curioso_2": "Regional outfits often include embroidered blouses, wide skirts, shawls, and decorated hats.",
    "dato_curioso_3": "Each locality in the Huasteca Hidalguense has its own variations and styles of regional clothing.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Vestimenta%2FTraje%20tipico%2Ftraje%20tipico%201.jpeg?alt=media&token=b7999bb5-5143-4712-bdb1-ec9e903d0289"
  },
  "traje de boda huasteco": {
    "dato_curioso_1": "The Huasteco wedding outfit is a traditional attire worn during wedding ceremonies in the Huasteca Hidalguense.",
    "dato_curioso_2": "The Huasteco wedding outfit for women includes long and wide skirts, embroidered blouses, and shawls.",
    "dato_curioso_3": "For men, the Huasteco wedding outfit may include white trousers, embroidered shirts, and hats.",
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Vestimenta%2FTraje%20de%20boda%2Fboda3.jpg?alt=media&token=06af4e91-6866-4b25-8cbf-ab1636990cce"
  }
};
const productos = {
  "burrito de barro blanco": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcaballo_vela_blanco.jpg?alt=media&token=510e77ab-b45e-42b8-98c9-0f6948adaf78",
    "nombre": "EL Burrito de barro",
    "costo": 49.99,
    "descripcion": "Burrito de barro para vela color blanco originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "El burrito de barro blanco es una artesanía tradicionalmente utilizada como soporte para velas durante celebraciones y eventos especiales en la región de Chililico.",
    "dato_curioso_2": "El proceso de elaboración de los burritos de barro implica la recolección de arcilla especial y su modelado a mano, lo que los hace únicos y auténticos.",
    "dato_curioso_3": "El color blanco del burrito de barro simboliza la pureza y la luz en la cultura local de Huejutla de Reyes Hidalgo."
  },
  "burrito de barro cafe": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcaballo_vela_cafe.jpg?alt=media&token=d151b24d-ebbe-4ed8-bb5d-179bf72e0800",
    "nombre": "El Burrito de barro",
    "costo": 49.99,
    "descripcion": "Burrito de barro para vela color cafe originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "El burrito de barro café es apreciado por su tonalidad cálida y terrosa, que evoca la conexión con la tierra y la naturaleza.",
    "dato_curioso_2": "Cada burrito de barro café es elaborado de manera artesanal, lo que garantiza su singularidad y valor como pieza decorativa.",
    "dato_curioso_3": "En la cultura local, los burritos de barro se consideran objetos de buena suerte y se utilizan para atraer energías positivas al hogar."
  },
  "canasta de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcanasta.jpg?alt=media&token=5594c4cf-bca9-4b2b-a73b-a415da4a0f65",
    "nombre": "La Canasta de barro",
    "costo": 89.99,
    "descripcion": "Canasta de barro color blanco con figura de girasol originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "La canasta de barro con figura de girasol es un símbolo de prosperidad y abundancia en la cultura local, ya que el girasol representa el sol y la fertilidad.",
    "dato_curioso_2": "Cada canasta de barro es elaborada a mano por artesanos expertos que aplican técnicas tradicionales transmitidas de generación en generación.",
    "dato_curioso_3": "Además de su valor estético, las canastas de barro son funcionales y se utilizan para almacenar frutas, verduras y otros objetos en los hogares."
  },
  "cazuela de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcasuela.jpg?alt=media&token=57a783ad-5cf2-478d-8c93-d469572fa9a9",
    "nombre": "La Casuela de barro",
    "costo": 199.99,
    "descripcion": "Casuela de barro color rojo originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Las casuelas de barro son reconocidas por su capacidad para distribuir el calor de manera uniforme durante la cocción, lo que las hace ideales para preparar platos tradicionales.",
    "dato_curioso_2": "El color rojo de las casuelas de barro se obtiene a través de técnicas de cocción y es muy apreciado por su belleza y durabilidad.",
    "dato_curioso_3": "Las casuelas de barro son consideradas utensilios de cocina esenciales en la gastronomía mexicana y se utilizan para preparar guisos, salsas y otros platillos tradicionales."
  },
  "copalero de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcopal_rojo.jpg?alt=media&token=2b276888-2769-4b6e-a021-0113c04b31fb",
    "nombre": "El Copalero de barro",
    "costo": 64.99,
    "descripcion": "Copalero de barro color rojo originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "El copalero de barro es un recipiente especial utilizado para quemar copal, una resina aromática utilizada en rituales y ceremonias tradicionales.",
    "dato_curioso_2": "El diseño del copalero de barro permite la difusión del humo del copal de manera elegante y simbólica durante los rituales.",
    "dato_curioso_3": "Los copaleros de barro se consideran objetos sagrados en la cultura local, ya que el copal se utiliza para purificar y limpiar los espacios energéticamente."
  },
  "jarron de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fjarron.jpg?alt=media&token=b8986977-400c-4327-aa9d-d9a8f77fc3c4",
    "nombre": "El Jarrón de barro",
    "costo": 149.99,
    "descripcion": "Jarrón de barro color rojo con figura de girasol originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Los jarrones de barro con figuras de girasol son considerados símbolos de belleza y vitalidad en la cultura local, ya que el girasol representa la energía del sol y el renacimiento.",
    "dato_curioso_2": "Cada jarrón de barro es elaborado meticulosamente a mano por artesanos expertos que imprimen detalles y acabados únicos en cada pieza.",
    "dato_curioso_3": "Los jarrones de barro son apreciados tanto por su valor estético como por su funcionalidad como recipientes decorativos para flores y arreglos florales."
  },
  "jarron de barro cafe": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fjarron_cafe.jpg?alt=media&token=a2c5dbe6-3d8e-42f5-a72a-aaae36751ba6",
    "nombre": "El Jarrón de barro",
    "costo": 149.99,
    "descripcion": "Jarrón de barro color rojo originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "El jarrón de barro café destaca por su tonalidad rica y cálida, que agrega un toque de elegancia y rusticidad a los espacios.",
    "dato_curioso_2": "Cada jarrón de barro café es cuidadosamente elaborado por artesanos que dominan la técnica del modelado y la decoración de piezas de barro.",
    "dato_curioso_3": "Los jarrones de barro son considerados tesoros artesanales en Chililico y se transmiten de generación en generación como símbolos de la tradición y el patrimonio cultural."
  },
  "florero de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fflorero.jpg?alt=media&token=22b3b713-efe0-42a4-a9b7-8f4fb4c945f9",
    "nombre": "El Florero de barro",
    "costo": 99.99,
    "descripcion": "Florero de barro color rojo originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Los floreros de barro son apreciados por su capacidad para realzar la belleza natural de las flores y su conexión con la tierra.",
    "dato_curioso_2": "Cada florero de barro es creado con dedicación y habilidad, siguiendo técnicas ancestrales que garantizan su durabilidad y resistencia.",
    "dato_curioso_3": "En la cultura local, los floreros de barro se consideran objetos de buen augurio y se utilizan para honrar a la naturaleza y embellecer los espacios."
  },
  "olla de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Folla.jpg?alt=media&token=a28f282c-bbbb-4ba7-8a0a-f7f5e7f897ba",
    "nombre": "La Olla de barro",
    "costo": 119.99,
    "descripcion": "Olla de barro color blanco originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Las ollas de barro son parte esencial de la cocina tradicional en la región de Chililico, ya que permiten una cocción lenta y uniforme de los alimentos.",
    "dato_curioso_2": "Cada olla de barro es elaborada con arcilla seleccionada y tratada cuidadosamente para garantizar su resistencia al calor y su durabilidad.",
    "dato_curioso_3": "El uso de ollas de barro en la cocina no solo realza el sabor de los alimentos, sino que también promueve una alimentación más saludable al conservar los nutrientes de los ingredientes."
  },
  "plato de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fplato.jpg?alt=media&token=53dbc6c9-7494-4ab6-84a1-e0d95ee2a151",
    "nombre": "El Plato de barro",
    "costo": 69.99,
    "descripcion": "Plato de barro color rojo originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Los platos de barro son apreciados por su capacidad para mantener los alimentos calientes durante más tiempo, conservando así su sabor y temperatura.",
    "dato_curioso_2": "Cada plato de barro es elaborado con meticulosidad, aplicando técnicas de alfarería que garantizan la calidad y resistencia del producto final.",
    "dato_curioso_3": "Los platos de barro se consideran elementos fundamentales en la gastronomía tradicional de la región, ya que realzan la presentación de los platillos típicos y aportan un toque de autenticidad."
  },
  "tequilero de barro": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Ftequilero.jpg?alt=media&token=25325844-59ac-4468-a04c-b05cb6ef8d4e",
    "nombre": "El Tequilero de barro",
    "costo": 59.99,
    "descripcion": "Tequilero de barro color rojo originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Los tequileros de barro son elementos indispensables en las celebraciones y fiestas tradicionales de la región, donde se degusta tequila y se comparte la alegría.",
    "dato_curioso_2": "Cada tequilero de barro es elaborado con dedicación y maestría por artesanos que dominan la técnica de conformado y decoración de piezas de barro.",
    "dato_curioso_3": "En la cultura local, el tequilero de barro es considerado un símbolo de hospitalidad y amistad, ya que se utiliza para brindar y compartir momentos especiales con los seres queridos."
  },
  "taza de ceramica azul": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Ftaza_azul.jpg?alt=media&token=9f0cefd6-6f21-4225-a975-a70bc413b867",
    "nombre": "La Taza de cerámica",
    "costo": 49.99,
    "descripcion": "Taza de ceramica color azul originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Las tazas de cerámica azul son reconocidas por su elegancia y su conexión con el elemento del agua, simbolizando la tranquilidad y la armonía.",
    "dato_curioso_2": "Cada taza de cerámica azul es moldeada y decorada a mano, lo que les confiere un carácter único y personalizado.",
    "dato_curioso_3": "Además de su valor estético, las tazas de cerámica azul son funcionales y se utilizan para disfrutar de bebidas calientes como café, té y chocolate."
  },
  "taza de ceramica naranja": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Ftaza_naranja.jpg?alt=media&token=9e63746c-09da-4ee0-8aeb-f9cb966c0f4c",
    "nombre": "La Taza de cerámica",
    "costo": 49.99,
    "descripcion": "Taza de ceramica color naranja originario de Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Las tazas de cerámica naranja representan la energía y la vitalidad, evocando el cálido resplandor del sol en la cultura local.",
    "dato_curioso_2": "Cada taza de cerámica naranja es moldeada y decorada a mano por artesanos que dominan las técnicas de alfarería y esmaltado.",
    "dato_curioso_3": "Las tazas de cerámica naranja son ideales para comenzar el día con energía, ya que su color vibrante estimula los sentidos y brinda una experiencia sensorial única."
  }
};
const products = {
  "white clay donkey": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcaballo_vela_blanco.jpg?alt=media&token=510e77ab-b45e-42b8-98c9-0f6948adaf78",
    "nombre": "The White Mud Burrito",
    "costo": 49.99,
    "descripcion": "White clay burrito for candles, originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "The white mud burrito is a traditional craft used as a candle holder during celebrations and special events in the Chililico region.",
    "dato_curioso_2": "The process of making white mud burritos involves collecting special clay and hand-molding, making each piece unique and authentic.",
    "dato_curioso_3": "The white color of the mud burrito symbolizes purity and light in the local culture of Huejutla de Reyes Hidalgo."
  },
  "brown clay donkey": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcaballo_vela_cafe.jpg?alt=media&token=d151b24d-ebbe-4ed8-bb5d-179bf72e0800",
    "nombre": "The Brown Mud Burrito",
    "costo": 49.99,
    "descripcion": "Brown clay burrito for candles, originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "The brown mud burrito is appreciated for its warm and earthy tones, evoking a connection with the earth and nature.",
    "dato_curioso_2": "Each brown mud burrito is handcrafted, ensuring its uniqueness and value as a decorative piece.",
    "dato_curioso_3": "In the local culture, brown mud burritos are considered objects of good luck and are used to attract positive energies to the home."
  },
  "clay basket": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcanasta.jpg?alt=media&token=5594c4cf-bca9-4b2b-a73b-a415da4a0f65",
    "nombre": "The Mud Basket",
    "costo": 89.99,
    "descripcion": "White mud basket with a sunflower figure, originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "The mud basket with a sunflower figure is a symbol of prosperity and abundance in the local culture, as the sunflower represents the sun and fertility.",
    "dato_curioso_2": "Each mud basket is handcrafted by skilled artisans using traditional techniques passed down through generations.",
    "dato_curioso_3": "In addition to its aesthetic value, mud baskets are functional and used to store fruits, vegetables, and other objects in homes."
  },
  "clay casserole": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcasuela.jpg?alt=media&token=57a783ad-5cf2-478d-8c93-d469572fa9a9",
    "nombre": "The Clay Casserole",
    "costo": 199.99,
    "descripcion": "Red clay casserole originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Clay casseroles are known for their ability to distribute heat evenly during cooking, making them ideal for preparing traditional dishes.",
    "dato_curioso_2": "The red color of clay casseroles is achieved through cooking techniques and is highly appreciated for its beauty and durability.",
    "dato_curioso_3": "Clay casseroles are considered essential kitchen utensils in Mexican cuisine and are used to prepare stews, sauces, and other traditional dishes."
  },
  "clay copal holder": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcopal_rojo.jpg?alt=media&token=2b276888-2769-4b6e-a021-0113c04b31fb",
    "nombre": "The Clay Copal Burner",
    "costo": 64.99,
    "descripcion": "Red clay copal burner originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "The clay copal burner is a special container used to burn copal, an aromatic resin used in traditional rituals and ceremonies.",
    "dato_curioso_2": "The design of the clay copal burner allows the elegant and symbolic diffusion of copal smoke during rituals.",
    "dato_curioso_3": "Clay copal burners are considered sacred objects in the local culture, as copal is used to purify and cleanse spaces energetically."
  },
  "clay vase": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fjarron.jpg?alt=media&token=b8986977-400c-4327-aa9d-d9a8f77fc3c4",
    "nombre": "The Clay Vase",
    "costo": 149.99,
    "descripcion": "Red clay vase with a sunflower figure originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Clay vases with sunflower figures are considered symbols of beauty and vitality in the local culture, as the sunflower represents the energy of the sun and rebirth.",
    "dato_curioso_2": "Each clay vase is meticulously handcrafted by skilled artisans, adding unique details and finishes to each piece.",
    "dato_curioso_3": "Clay vases are cherished for both their aesthetic value and functionality as decorative containers for flowers and floral arrangements."
  },
  "brown clay vase": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fjarron_cafe.jpg?alt=media&token=a2c5dbe6-3d8e-42f5-a72a-aaae36751ba6",
    "nombre": "The Clay Vase",
    "costo": 149.99,
    "descripcion": "Red clay vase originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "The brown clay vase stands out for its rich and warm tones, adding a touch of elegance and rusticity to spaces.",
    "dato_curioso_2": "Each brown clay vase is carefully crafted by artisans who master the technique of clay modeling and decoration.",
    "dato_curioso_3": "Clay vases are considered artisan treasures in Chililico, passed down from generation to generation as symbols of tradition and cultural heritage."
  },
  "clay pot": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Folla.jpg?alt=media&token=a28f282c-bbbb-4ba7-8a0a-f7f5e7f897ba",
    "nombre": "The Clay Pot",
    "costo": 119.99,
    "descripcion": "White clay pot originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Clay pots are essential to traditional cooking in the Chililico region, allowing slow and even cooking of food.",
    "dato_curioso_2": "Each clay pot is made with carefully selected and treated clay to ensure its heat resistance and durability.",
    "dato_curioso_3": "The use of clay pots in cooking not only enhances the flavor of food but also promotes healthier eating by preserving the nutrients of ingredients."
  },
  "clay plate": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fplato.jpg?alt=media&token=53dbc6c9-7494-4ab6-84a1-e0d95ee2a151",
    "nombre": "The Clay Plate",
    "costo": 69.99,
    "descripcion": "Red clay plate originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Clay plates are appreciated for their ability to keep food warm for a longer time, preserving its taste and temperature.",
    "dato_curioso_2": "Each red clay plate is crafted meticulously, using pottery techniques that ensure the quality and resistance of the final product.",
    "dato_curioso_3": "Clay plates are considered fundamental elements in the region's traditional cuisine, as they enhance the presentation of typical dishes and add an authentic touch."
  },
  "clay tequila shot glass": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Ftequilero.jpg?alt=media&token=25325844-59ac-4468-a04c-b05cb6ef8d4e",
    "nombre": "The Clay Tequila Shot Glass",
    "costo": 59.99,
    "descripcion": "Red clay tequila shot glass originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Clay tequila shot glasses are indispensable items in celebrations and traditional festivals in the region, where tequila is enjoyed, and joy is shared.",
    "dato_curioso_2": "Each clay tequila shot glass is crafted with dedication and skill by artisans who master the techniques of shaping and decorating clay pieces.",
    "dato_curioso_3": "In the local culture, the clay tequila shot glass is considered a symbol of hospitality and friendship, used to toast and share special moments with loved ones."
  },
  "blue ceramic mug": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Ftaza_azul.jpg?alt=media&token=9f0cefd6-6f21-4225-a975-a70bc413b867",
    "nombre": "The Blue Ceramic Mug",
    "costo": 49.99,
    "descripcion": "Blue ceramic mug originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Blue ceramic mugs are known for their elegance and connection to the water element, symbolizing tranquility and harmony.",
    "dato_curioso_2": "Each blue ceramic mug is molded and decorated by hand, giving them a unique and personalized character.",
    "dato_curioso_3": "In addition to its aesthetic value, blue ceramic mugs are functional and used to enjoy hot beverages such as coffee, tea, and chocolate."
  },
  "orange ceramic mug": {
    "url": "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Ftaza_naranja.jpg?alt=media&token=9e63746c-09da-4ee0-8aeb-f9cb966c0f4c",
    "nombre": "The Orange Ceramic Mug",
    "costo": 49.99,
    "descripcion": "Orange ceramic mug originating from Chililico, Huejutla de Reyes Hidalgo.",
    "dato_curioso_1": "Orange ceramic mugs represent energy and vitality, evoking the warm glow of the sun in the local culture.",
    "dato_curioso_2": "Each orange ceramic mug is molded and decorated by hand by artisans who master the techniques of pottery and glazing.",
    "dato_curioso_3": "Orange ceramic mugs are ideal for starting the day with energy, as their vibrant color stimulates the senses and provides a unique sensory experience."
  }
};
const catalogosDisponibles = {
  festividades: festividades,
  gastronomia: gastronomia,
  danza: danza,
  musica: musica,
  vestimenta: vestimenta,
  productos: productos,
  festivities: festivities,
  gastronomy: gastronomy,
  dance: dance,
  music: music,
  clothing: clothing,
  products: products
};
const urlCatalogos = {
  festividades: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Tradiciones%2Fxantolo.jpg?alt=media&token=115ae09f-a278-4bb5-8752-900ad34a4e32",
  gastronomia: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomia%2Fgastronomia.jpg?alt=media&token=3cc0b431-8c34-43cf-9cc7-c081554920a8",
  danza: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Danza%2Fdanza.jpg?alt=media&token=da516511-f200-4ed8-aa79-eecf33f8787d",
  musica: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Musica%2Ftrio.jpg?alt=media&token=3e9fb164-e557-4c96-9c52-1f8120b973bf",
  vestimenta: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Vestimenta%2FTraje%20de%20boda%2Fboda3.jpg?alt=media&token=06af4e91-6866-4b25-8cbf-ab1636990cce",
  productos: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/productos%2Fcaballo_vela_blanco.jpg?alt=media&token=510e77ab-b45e-42b8-98c9-0f6948adaf78",
  
  // English translations
  festivities: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Traditions%2Fxantolo.jpg?alt=media&token=115ae09f-a278-4bb5-8752-900ad34a4e32",
  gastronomy: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Gastronomy%2Fgastronomy.jpg?alt=media&token=3cc0b431-8c34-43cf-9cc7-c081554920a8",
  dance: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Dance%2Fdance.jpg?alt=media&token=da516511-f200-4ed8-aa79-eecf33f8787d",
  music: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Music%2Ftrio.jpg?alt=media&token=3e9fb164-e557-4c96-9c52-1f8120b973bf",
  clothing: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Clothing%2FWedding%20Attire%2Fwedding3.jpg?alt=media&token=06af4e91-6866-4b25-8cbf-ab1636990cce",
  products: "https://firebasestorage.googleapis.com/v0/b/corazon-huasteco-bfbcc.appspot.com/o/Products%2Fwhite_candle_horse.jpg?alt=media&token=510e77ab-b45e-42b8-98c9-0f6948adaf78"
};
const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
  return {
    type: "Alexa.Presentation.APL.RenderDocument",
    token: tokenId,
    document: {
      type: "Link",
      src: "doc://alexa/apl/documents/" + aplDocumentId
    },
    datasources: dataSources
  };
};
function getPersistenceAdapter() {
  function isAlexaHosted() {
    return process.env.S3_PERSISTENCE_BUCKET ? true : false;
  }

  const tableName = 'corazon_huasteco';

  if (isAlexaHosted()) {
    const { S3PersistenceAdapter } = require('ask-sdk-s3-persistence-adapter');
    return new S3PersistenceAdapter({
      bucketName: process.env.S3_PERSISTENCE_BUCKET
    });
  } else {
    // IMPORTANT: don't forget to give DynamoDB access to the role you're using to run this lambda (IAM)
    const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
    return new DynamoDbPersistenceAdapter({
      tableName: tableName,
      createTable: true
    });
  }
}
const LaunchRequestHandler = {
  async canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const { attributesManager, serviceClientFactory, requestEnvelope } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const requestAttributes = attributesManager.getRequestAttributes();

    
// Verificar si las variables ya existen en sessionAttributes antes de inicializarlas
    // if (!sessionAttributes.hasOwnProperty('tordo')) {
    //   sessionAttributes['tordo'] = 0;
    // }
    // if (!sessionAttributes.hasOwnProperty('patrias')) {
    //   sessionAttributes['patrias'] = 0;
    // }
    // if (!sessionAttributes.hasOwnProperty('semana')) {
    //   sessionAttributes['semana'] = 0;
    // }
    // if (!sessionAttributes.hasOwnProperty('nochebuena')) {
    //   sessionAttributes['nochebuena'] = 0;
    // }
    // if (!sessionAttributes.hasOwnProperty('xanto')) {
    //   sessionAttributes['xanto'] = 0;
    // }
    // if (!sessionAttributes.hasOwnProperty('guada')) {
    //   sessionAttributes['guada'] = 0;
    // }
    // if (!sessionAttributes.hasOwnProperty('carnaval')) {
    //   sessionAttributes['carnaval'] = 0;
    // }
        sessionAttributes['tordo'] = 0;
    sessionAttributes['patrias'] = 0;
    sessionAttributes['semana'] = 0;
    sessionAttributes['nochebuena'] = 0;
    sessionAttributes['xanto'] = 0;
    sessionAttributes['guada'] = 0;
    sessionAttributes['carnaval'] = 0;
    if (!sessionAttributes['name']) {
      try {
        const { permissions } = requestEnvelope.context.System.user;
        if (!permissions) throw { statusCode: 401, message: 'No permissions available' };
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const profileName = await upsServiceClient.getProfileGivenName();
        if (profileName) {
          sessionAttributes['name'] = profileName;
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        if (error.statusCode === 401 || error.statusCode === 403) {
          handlerInput.responseBuilder.withAskForPermissionsConsentCard(GIVEN_NAME_PERMISSION);
        }
      }
    }
    
    let speakOutput = "";
    let text = '';
    let info = '';
    let url = '';

    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';

    speakOutput = requestAttributes.t('welcome', name) + ' ' + requestAttributes.t('puedesDecirme');

    const datasource = {
      dataSource: {
        type: 'object',
        text: requestAttributes.t('welcome', name),
        info: requestAttributes.t('puedesDecirme'),
        url: bienvenida,
        logoUrl: logo
      }
    };

    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
      const aplDirective = createDirectivePayload(welcome, datasource);
      handlerInput.responseBuilder.addDirective(aplDirective);
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
const cuandoEs = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'cuandoEs';
  },
  async handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    let requestAttributes = attributesManager.getRequestAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    sessionAttributes['tordo'] = 0;
    sessionAttributes['patrias'] = 0;
    sessionAttributes['semana'] = 0;
    sessionAttributes['nochebuena'] = 0;
    sessionAttributes['xanto'] = 0;
    sessionAttributes['guada'] = 0;
    sessionAttributes['carnaval'] = 0;
    let text = '';
    let info = '';
    let url = '';
    let speakOutput = '';
    let fiestas = intent.slots.fiestas.resolutions.resolutionsPerAuthority[0].values[0].value.name;

    // Buscar en los catálogos disponibles
    for (let catalogo in catalogosDisponibles) {
      if (catalogosDisponibles.hasOwnProperty(catalogo)) {
        const elementos = catalogosDisponibles[catalogo];

        // Verificar si la festividad se encuentra en el catálogo actual
        if (elementos.hasOwnProperty(fiestas)) {
          const festividad = elementos[fiestas];
          text = requestAttributes.t('inicia', name, festividad.nombre);
          info = festividad.fecha_larga;
          url = festividad.url;
          sessionAttributes['nombreFiesta'] = fiestas;
          let pregunta = requestAttributes.t('pregunta');
          speakOutput = `${text} ${info}, ${pregunta}`;
          const festividadName = sessionAttributes[festividad.activa];
        //   if (festividadName === 0) {
            pregunta = requestAttributes.t('quieres');
            speakOutput = `${text} ${info}, ${pregunta}`;
        //   }

          const datasource = {
            dataSource: {
              type: 'object',
              text: text,
              info: info,
              url: url
            }
          };

          if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(componet, datasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
          }

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
        }
      }
    }

  }
};
const crearRecordatorio = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'crearRecordatorio'
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope, attributesManager, serviceClientFactory, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const nombreFiesta = sessionAttributes['nombreFiesta'];
    let requestAttributes = attributesManager.getRequestAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';

    // Verificar si la festividad se encuentra en el objeto festividades
    if (festividades.hasOwnProperty(nombreFiesta)||festivities.hasOwnProperty(nombreFiesta)) {
      const festividad = festividades[nombreFiesta];
      const fechaCorta = festividad.fecha_corta; // Obtener la fecha corta de la festividad seleccionada
      const [dia, mes] = fechaCorta.split("-");
      const fechaFestividad = moment(`${mes}-${dia}`, 'MM-DD');

      let numSemanas = handlerInput.requestEnvelope.request.intent.slots.semana.value ; // Valor por defecto 0 si no se proporciona

      const currentDate = moment();
      const currentYear = currentDate.year();
      let reminderDate = fechaFestividad.clone().subtract(numSemanas, 'weeks');

      // Crear el mensaje para el recordatorio
      const message = requestAttributes.t('mensajeRecordatorio',nombreFiesta,dia,mes,numSemanas);

      try {
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const timezone = await upsServiceClient.getSystemTimeZone(deviceId);

        const reminderData = createReminderData(reminderDate, timezone, message);

        const reminderServiceClient = serviceClientFactory.getReminderManagementServiceClient();
        const reminderResponse = await reminderServiceClient.createReminder(reminderData);
        const reminderId = reminderResponse.alertToken;

        sessionAttributes['reminderId'] = reminderId;
        attributesManager.setSessionAttributes(sessionAttributes);
           const datasource = {
            dataSource: {
              type: 'object',
              text: requestAttributes.t('creadoRecordatorio',name,nombreFiesta,numSemanas),
              info: "",
              url: logo
            }
          };

          if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(componet, datasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
          }

        return responseBuilder.speak(requestAttributes.t('creadoRecordatorio',name,nombreFiesta,numSemanas)).reprompt(speakOutput).getResponse();
      } catch (error) {
        console.error('Error al crear el recordatorio:', error);
           const datasource = {
            dataSource: {
              type: 'object',
              text: requestAttributes.t('UNSUPPORTED_DEVICE_MSG'),
              info: "",
              url: logo
            }
          };

          if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(errorAPL, datasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
          }
        return responseBuilder.speak(requestAttributes.t('UNSUPPORTED_DEVICE_MSG')).reprompt(speakOutput).getResponse();
      }
    } else {
      // La festividad seleccionada no está en el objeto festividades
      return responseBuilder.speak('La festividad seleccionada no está disponible.').getResponse();
    }
  },
};
function createReminderData(reminderTime, timezone, message) {
  return {
    requestTime: moment().toISOString(),
    trigger: {
      type: 'SCHEDULED_ABSOLUTE',
      scheduledTime: reminderTime.tz(timezone).format('YYYY-MM-DDTHH:mm:ss'),
      timeZoneId: timezone,
    },
    alertInfo: {
      spokenInfo: {
        content: [
          {
            locale: 'es-MX',
            text: message,
          },
        ],
      },
    },
    pushNotification: {
      status: 'ENABLED',
    },
  };
}
const cuantoFalta = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'cuantoFalta';
  },
  async handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const requestAttributes = attributesManager.getRequestAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    let fiestas = intent.slots.fiesta.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    let pregunta = requestAttributes.t('pregunta');
    let speakOutput = '';

    // Buscar en los catálogos disponibles
    for (let catalogo in catalogosDisponibles) {
      if (catalogosDisponibles.hasOwnProperty(catalogo)) {
        const elementos = catalogosDisponibles[catalogo];

        // Verificar si la festividad se encuentra en el catálogo actual
        if (elementos.hasOwnProperty(fiestas)) {
          const festividad = elementos[fiestas];
          const currentDate = moment();
          const fechaCorta = festividad.fecha_corta;
          const [dia, mes] = fechaCorta.split("-");
          const festividadDate = moment(`${moment().year()}-${mes}-${dia}`, 'YYYY-MM-DD');

          if (currentDate.isAfter(festividadDate, 'day')) {
            festividadDate.add(1, 'year');
          }

          const daysLeft = festividadDate.diff(currentDate, 'days');
          const monthsLeft = festividadDate.diff(currentDate, 'months');
          const remainingDays = daysLeft - (monthsLeft * 30);

          const text = requestAttributes.t('falta', name, festividad.nombre);
          const url = festividad.url;
          let info = '';

          if (monthsLeft === 0) {
            info = requestAttributes.t('fechaNoMes', remainingDays);
          } else {
            info = requestAttributes.t('FechaMes', monthsLeft, remainingDays);
          }

          const datasource = {
            dataSource: {
              type: 'object',
              text: text,
              info: info,
              url: url
            }
          };

          if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(componet, datasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
          }

          speakOutput = `${text} ${info}, ${pregunta}`;
          break; // Salir del bucle si se encuentra la festividad en algún catálogo
        }
      }
    }
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  }

};
const datosCuriosos = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'datosCuriosos'
    );
  },
  handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const fiestas = handlerInput.requestEnvelope.request.intent.slots.dato.value;

    let text = '';
    let info = '';
    let url = '';
    let festividad = '';
    sessionAttributes['datoCurioso'] = "";
    sessionAttributes['festividad']="";
    sessionAttributes['categoria']="";
    // Iterar sobre los catálogos disponibles
    for (let catalogo in catalogosDisponibles) {
      if (catalogosDisponibles.hasOwnProperty(catalogo)) {
        const elementos = catalogosDisponibles[catalogo];

        // Verificar si la festividad se encuentra en el catálogo actual
        if (elementos.hasOwnProperty(fiestas)) {
          festividad = elementos[fiestas];
          text = requestAttributes.t('dato', name, fiestas);
          info = festividad.dato_curioso_1;
          url = festividad.url;
          sessionAttributes['datoCurioso'] = "dato_curioso_1";
          sessionAttributes['festividad']=fiestas;
          sessionAttributes['categoria']=elementos;
          const datasource = {
              dataSource: {
                type: 'object',
                text: text,
                info: info,
                url: url
              }
            };
        
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(componet, datasource);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
          break; // Salir del bucle si se encuentra la festividad en algún catálogo
        }
      }else{
          const datasource = {
              dataSource: {
                type: 'object',
                text: requestAttributes.t('error2', name, fiestas),
              }
            };
        
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(error, datasource);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
          break;
      }
    }

    let pregunta = requestAttributes.t('otro',fiestas);
    

    let speakOutput = `${text} ${info}, ${pregunta}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  }
};
const siguienteDato = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'siguienteDato'
    );
  },
  handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    
    const sessionAttributes = attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    const datoCurioso = sessionAttributes['datoCurioso'] ;
    const festividad = sessionAttributes['festividad'];
    const categoria = sessionAttributes['categoria'];
    
    let text = '';
    let info = '';
    let url = '';
    let nextDatoCurioso=""
    let festividadData=""
    if (categoria.hasOwnProperty(festividad)) {
      festividadData = categoria[festividad];
     if (datoCurioso === 'dato_curioso_1') {
        info = festividadData.dato_curioso_2;
        text = requestAttributes.t('dato',name, festividad);
        nextDatoCurioso = 'dato_curioso_2';
      } else if (datoCurioso === 'dato_curioso_2') {
        info = festividadData.dato_curioso_3;
        text = requestAttributes.t('dato',name, festividad);
        nextDatoCurioso = 'dato_curioso_3';
      } else {
        text = requestAttributes.t('noDato', name, festividad);
        info="";
      }
    }
    
    url = festividadData.url;
    sessionAttributes['datoCurioso'] = nextDatoCurioso;    
    sessionAttributes['festividad']=festividad;
    sessionAttributes['antes']=datoCurioso;
    const datasource = {
      dataSource: {
        type: 'object',
        text: text,
        info: info,
        url: url
      }
    };
    
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
      const aplDirective = createDirectivePayload(componet, datasource);
      handlerInput.responseBuilder.addDirective(aplDirective);
    }
    let pregunta = requestAttributes.t('otro',festividad);
    let speakOutput = `${text} ${info}, ${pregunta}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  }
};
const anteriorDato = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'anteriorDato'
    );
  },
  handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    
    const sessionAttributes = attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    const datoCurioso = sessionAttributes['datoCurioso'] ;
    const festividad = sessionAttributes['festividad'];
    const categoria = sessionAttributes['categoria'];
    
    let text = '';
    let info = '';
    let url = '';
    let previousDatoCurioso = "";
    let festividadData = "";
    let pregunta=""
    if (categoria.hasOwnProperty(festividad)) {
      festividadData = categoria[festividad];
      
      if (datoCurioso === 'dato_curioso_3') {
        info = festividadData.dato_curioso_2;
        text = requestAttributes.t('dato', name, festividad);
        previousDatoCurioso = 'dato_curioso_2';
         pregunta = requestAttributes.t('antes', festividad);
      } else if (datoCurioso === 'dato_curioso_2') {
        info = festividadData.dato_curioso_1;
        text = requestAttributes.t('dato', name, festividad);
        previousDatoCurioso = 'dato_curioso_1';
         pregunta = requestAttributes.t('pregunta');
      } else {
        info = festividadData.dato_curioso_1;
        text = requestAttributes.t('dato', name, festividad);
        previousDatoCurioso = 'dato_curioso_1';
         pregunta = requestAttributes.t('pregunta');
      }
    }
    
    url = festividadData.url;
    sessionAttributes['datoCurioso'] = previousDatoCurioso;    
    sessionAttributes['festividad'] = festividad;
    sessionAttributes['antes'] = datoCurioso;
    
    const datasource = {
      dataSource: {
        type: 'object',
        text: text,
        info: info,
        url: url
      }
    };
    
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
      const aplDirective = createDirectivePayload(componet, datasource);
      handlerInput.responseBuilder.addDirective(aplDirective);
    }
    
    
    let speakOutput = `${text} ${info}, ${pregunta}`;
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  }
};
const fetch = require('node-fetch');
async function convertCurrency(fromCurrency, toCurrency, amount) {
  const apiKey = '3329cca019ed7507e64f8731';
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

  try {
    // Obtener las tasas de cambio más recientes para la moneda base
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Verificar si las tasas de cambio se obtuvieron correctamente
    if (data.result !== 'success') {
      throw new Error(`Error al obtener las tasas de cambio: ${data['error-type']}`);
    }

    // Obtener la tasa de cambio de la moneda de origen a la moneda de destino
    const conversionRate = data.conversion_rates[toCurrency];

    // Verificar si se encontró una tasa de cambio válida
    if (!conversionRate) {
      throw new Error(`No se encontró una tasa de cambio válida para ${fromCurrency} a ${toCurrency}`);
    }

    // Realizar la conversión de divisas
    const convertedAmount = amount * conversionRate;
    const convertedAmountRounded = convertedAmount.toFixed(2); // Redondear a dos decimales

    return convertedAmountRounded;
  } catch (error) {
    console.error('Error al convertir divisas:', error);
    throw new Error('Hubo un error al convertir divisas. Por favor, intenta nuevamente más tarde.');
  }
}
function getCurrencyCode(currencyText) {
  let currencyCode = '';

  if (currencyText.toLowerCase() === 'pesos') {
    currencyCode = 'MXN';
  } else if (currencyText.toLowerCase() === 'euros') {
    currencyCode = 'EUR';
  } else if (currencyText.toLowerCase() === 'dólares' || currencyText.toLowerCase() === 'dolares') {
    currencyCode = 'USD';
  } else if (currencyText.toLowerCase() === 'yenes') {
    currencyCode = 'JPY';
  } else if (currencyText.toLowerCase() === 'libras') {
    currencyCode = 'GBP';
  }

  return currencyCode;
}
const cuantoCuesta = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'cuantoCuesta';
  },
  async handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    let requestAttributes = attributesManager.getRequestAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    let producto = intent.slots.producto.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    let moneda = intent.slots.moneda.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    let monedaCode = getCurrencyCode(moneda);
    let text = '';
    let info = '';
    let url = '';
    let speakOutput = '';
    let costo = 0;
    let productosDatos = "";

    // Iterar sobre los catálogos disponibles
    for (let catalogo in catalogosDisponibles) {
      if (catalogosDisponibles.hasOwnProperty(catalogo)) {
        const elementos = catalogosDisponibles[catalogo];

        // Verificar si la festividad se encuentra en el catálogo actual
        if (elementos.hasOwnProperty(producto)) {
          productosDatos = elementos[producto];
          text = requestAttributes.t('cuesta', name, productosDatos.nombre);
          costo = productosDatos.costo;

          try {
            // Convertir el costo a la moneda seleccionada por el usuario
            const convertedCost = await convertCurrency('MXN', monedaCode, costo);
            costo = convertedCost;

            // Asignar el valor convertido a la propiedad 'info' del objeto 'datasource'
            info = `${costo} ${moneda}`;
          } catch (error) {
            console.error('Error al convertir divisas:', error);
            // Manejar el error de conversión de divisas
            // ...
          }

          url = productosDatos.url;

          const datasource = {
            dataSource: {
              type: 'object',
              text: text,
              info: info,
              url: url
            }
          };

          if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(componet, datasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
          }
          break; // Salir del bucle si se encuentra la festividad en algún catálogo
        }
      } else {
        const datasource = {
          dataSource: {
            type: 'object',
            text: requestAttributes.t('error2', name, productosDatos.nombre),
          }
        };

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(error, datasource);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      }
    }

    let pregunta = requestAttributes.t('pregunta');

    speakOutput = `${text} ${info}, ${pregunta}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  }
};
const catalogoIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'catalogoIntent';
  },
  handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const requestAttributes = attributesManager.getRequestAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    const catalogoSlotValue = intent.slots.catalogo.value;
    let pregunta = requestAttributes.t('pregunta');
    let speakOutput = "";
    let text = '';
    let info = '';
    let url = '';
    const catalogo = catalogosDisponibles[catalogoSlotValue];

    // Buscar en los catálogos disponibles
    if (catalogo) {
      const titulos = Object.keys(catalogo);
      info = titulos.join(', ');
      if (titulos.length > 0) {
        speakOutput = requestAttributes.t('losTitulos', name, catalogoSlotValue, info, pregunta);
        text = requestAttributes.t('titulo', name, catalogoSlotValue);
        url = urlCatalogos[catalogoSlotValue];
        
        const datasource = {
          dataSource: {
            type: 'object',
            text: text,
            info: info,
            url: url
          }
        };
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(componet, datasource);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
      }
    } else {
      speakOutput = requestAttributes.t('error', name, catalogoSlotValue);
      const datasource = {
        dataSource: {
          type: 'object',
          text: requestAttributes.t('error', name, catalogoSlotValue),
        }
      };

      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
        const aplDirective = createDirectivePayload(error, datasource);
        handlerInput.responseBuilder.addDirective(aplDirective);
      }
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  }
};
const axios = require('axios');
// Función para obtener la ubicación utilizando una API externa (ipinfo.io)
async function getLocationFromIP() {
  try {
    const response = await axios.get('http://ipinfo.io/json');
    const { loc } = response.data;
    const [latitud, longitud] = loc.split(',').map(coord => parseFloat(coord));

    return { latitud, longitud };
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
    throw error;
  }
}
const distanciaIntent = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'distanciaIntent'
    );
  },
  async handle(handlerInput) {
    const { responseBuilder } = handlerInput;

    try {
      const ubicacion = await getLocationFromIP();

      if (!ubicacion) {
        return responseBuilder
          .speak('No se pudo obtener tu ubicación actual. Por favor, intenta nuevamente más tarde.')
          .getResponse();
      }

      const latitude = ubicacion.latitud;
      const longitude = ubicacion.longitud;

      const latitudHuejutla = 21.1333;
      const longitudHuejutla = -98.4167;

      const distanciaKm = calcularDistancia(latitude, longitude, latitudHuejutla, longitudHuejutla);

      return responseBuilder
        .speak(`Tus coordenadas de ubicación son: Latitud ${latitude}, Longitud ${longitude}. La distancia a Huejutla de Reyes, Hidalgo, es aproximadamente ${distanciaKm.toFixed(2)} kilómetros.`)
        .getResponse();
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      return responseBuilder
        .speak('Lo siento, hubo un error al obtener tu ubicación. Por favor, intenta nuevamente más tarde.')
        .getResponse();
    }
  },
};
// Función para obtener la ubicación utilizando la API de ipinfo.io
// async function obtenerUbicacion() {
//   try {
//     const response = await axios.get('http://ip-api.com/json');
//     const { lat, lon } = response.data;

//     return { latitud: parseFloat(lat), longitud: parseFloat(lon) };
//   } catch (error) {
//     console.error('Error al obtener la ubicación:', error);
//     throw error;
//   }
// }

// // Función para calcular la distancia en kilómetros entre dos coordenadas geográficas utilizando la fórmula del haversine.
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const radioTierra = 6371; // Radio medio de la Tierra en kilómetros

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancia = radioTierra * c;
  return distancia;
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      let speakOutput = "";
let text = '';
let info = '';
let url = '';
    speakOutput = `DATOS CURIOSOS`;
   

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
    const requestAttributes = attributesManager.getRequestAttributes();
    const speakOutput =  requestAttributes.t('despedida', name);
    const datasource = {
        dataSource: {
          type: 'object',
          text: requestAttributes.t('despedida', name),
          info: '',
          url:logo
        }
      };
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
      // generate the APL RenderDocument directive that will be returned from your skill
      const aplDirective = createDirectivePayload(componet, datasource);
      // add the RenderDocument directive to the responseBuilder
      handlerInput.responseBuilder.addDirective(aplDirective);
    }
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withShouldEndSession(true)
      .getResponse();
  },
};
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Lo siento, no tengo información sobre eso. Por favor, inténtalo de nuevo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de activar ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento, he tenido problemas para hacer lo que me has pedido. Por favor, inténtalo de nuevo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};
const LocalizationRequestInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        }
    }
};
const LoadAttributesRequestInterceptor = {
    async process(handlerInput) {
        if (handlerInput.requestEnvelope.session['new']) {
            const { attributesManager } = handlerInput;
            const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
            handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
        }
    }
};
const SaveAttributesResponseInterceptor = {
    async process(handlerInput, response) {
        const { attributesManager } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const shouldEndSession = (typeof response.shouldEndSession === "undefined" ? true : response.shouldEndSession);
        if (shouldEndSession || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest') {
            attributesManager.setPersistentAttributes(sessionAttributes);
            await attributesManager.savePersistentAttributes();
        }
    }
};
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    cuantoFalta,
    cuandoEs,
    crearRecordatorio,
    datosCuriosos,
    catalogoIntent,
    siguienteDato,
    anteriorDato,
    cuantoCuesta,
    distanciaIntent,
    CancelAndStopIntentHandler,
    HelpIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler)
  .addErrorHandlers(
    ErrorHandler)
  .addRequestInterceptors(
    LocalizationRequestInterceptor,
    LoggingRequestInterceptor,
    LoadAttributesRequestInterceptor)
  .addResponseInterceptors(
    LoggingResponseInterceptor,
    SaveAttributesResponseInterceptor)
  .withPersistenceAdapter(getPersistenceAdapter())
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('sample/hello-world/v1.2')
  .lambda();
