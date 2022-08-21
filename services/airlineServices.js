import http from './httpServices'
import config from '../config.json'

const apiendPoint=config.apiendPoint+'/general_airlines'
export function getAirlines(){
    return http.get(apiendPoint)
  }

const apiendPoint1=config.apiendPoint+ '/admin_remove_airline'

function getUrl(id){
    return `${apiendPoint1}/${id}`;
}
export function deleteAirlines(Id){  
    return http.delete(getUrl(Id))
}
// export function deleteAirlines(Id){  
//   return http.delete(apiendPoint1,{data:{'Id':Id}})
// }
const apiendPoint2=config.apiendPoint+'/aircompany_getflights'
export function getAirlinesComp(){
    return http.get(apiendPoint2)
  }

  const apiendPoint3=config.apiendPoint+'/aircompany_removeflights'
  export function getAirlineFlights(){
      return http.get(apiendPoint3)
    }
  
  function getUrl3(id){
        return `${apiendPoint3}/${id}`;
    }
    export function deleteAirlineFlights(Id){  
        return http.delete(getUrl3(Id))
    }

    const apiendPoint4=config.apiendPoint+'/aircompany_update'

    export function getUpdateAirlines(){
        return http.get(apiendPoint4)
      }
    
    function getUrlt(id){
      return `${apiendPoint4}/${id}`;
    }
    export function getUpdateAirline(id){
        return http.get(getUrlt(id))
      }
      export function saveAirline(airline){
        
        //exists
        if(airline.id){
          // '/cars/id'
          const body = {...airline};
          delete body.id
          return http.put(getUrlt(airline.id), body)
        }
      }
      export function getCountries(){
        // return  {'data':[{'id': 1, 'name': 'AFGHANISTAN'}, {'id': 2, 'name': 'ALBANIA'}  ]}
        return {'data':[
        {'id':1,'name':'AFGHANISTAN'},
        {'id':2,'name':'ALBANIA'},
        {'id':3,'name':'ALGERIA'},
        {'id':4,'name':'AMERICAN SAMOA'},
        {'id':5,'name':'ANDORRA'},
        {'id':6,'name':'ANGOLA'},
        {'id':7,'name':'ANGUILLA'},
        {'id':8,'name':'ANTIGUA & BARBUDA'},
        {'id':9,'name':'ARGENTINA'},
        {'id':10,'name':'ARMENIA'},
        {'id':11,'name':'ARUBA'},
        {'id':12,'name':'AUSTRALIA'},
        {'id':13,'name':'AUSTRIA'},
        {'id':14,'name':'AZERBAIJAN'},
        {'id':15,'name':'BAHAMAS, THE'},
        {'id':16,'name':'BAHRAIN'},
        {'id':17,'name':'BANGLADESH'},
        {'id':18,'name':'BARBADOS'},
        {'id':19,'name':'BELARUS'},
        {'id':20,'name':'BELGIUM'},
        {'id':21,'name':'BELIZE'},
        {'id':22,'name':'BENIN'},
        {'id':23,'name':'BERMUDA'},
        {'id':24,'name':'BHUTAN'},
        {'id':25,'name':'BOLIVIA'},
        {'id':26,'name':'BOSNIA & HERZEGOVINA'},
        {'id':27,'name':'BOTSWANA'},
        {'id':28,'name':'BRAZIL'},
        {'id':29,'name':'BRITISH VIRGIN IS.'},
        {'id':30,'name':'BRUNEI'},
        {'id':31,'name':'BULGARIA'},
        {'id':32,'name':'BURKINA FASO'},
        {'id':33,'name':'BURMA'},
        {'id':34,'name':'BURUNDI'},
        {'id':35,'name':'CAMBODIA'},
        {'id':36,'name':'CAMEROON'},
        {'id':37,'name':'CANADA'},
        {'id':38,'name':'CAPE VERDE'},
        {'id':39,'name':'CAYMAN ISLANDS'},
        {'id':40,'name':'CENTRAL AFRICAN REP.'},
        {'id':41,'name':'CHAD'},
        {'id':42,'name':'CHILE'},
        {'id':43,'name':'CHINA'},
        {'id':44,'name':'COLOMBIA'},
        {'id':45,'name':'COMOROS'},
        {'id':46,'name':'CONGO, DEM. REP.'},
        {'id':47,'name':'CONGO, REPUB. OF THE'},
        {'id':48,'name':'COOK ISLANDS'},
        {'id':49,'name':'COSTA RICA'},
        {'id':50,'name':'COTE DIVOIRE'},
        {'id':51,'name':'CROATIA'},
        {'id':52,'name':'CUBA'},
        {'id':53,'name':'CYPRUS'},
        {'id':54,'name':'CZECH REPUBLIC'},
        {'id':55,'name':'DENMARK'},
        {'id':56,'name':'DJIBOUTI'},
        {'id':57,'name':'DOMINICA'},
        {'id':58,'name':'DOMINICAN REPUBLIC'},
        {'id':59,'name':'EAST TIMOR'},
        {'id':60,'name':'ECUADOR'},
        {'id':61,'name':'EGYPT'},
        {'id':62,'name':'EL SALVADOR'},
        {'id':63,'name':'EQUATORIAL GUINEA'},
        {'id':64,'name':'ERITREA'},
        {'id':65,'name':'ESTONIA'},
        {'id':66,'name':'ETHIOPIA'},
        {'id':67,'name':'FAROE ISLANDS'},
        {'id':68,'name':'FIJI'},
        {'id':69,'name':'FINLAND'},
        {'id':70,'name':'FRANCE'},
        {'id':71,'name':'FRENCH GUIANA'},
        {'id':72,'name':'FRENCH POLYNESIA'},
        {'id':73,'name':'GABON'},
        {'id':74,'name':'GAMBIA, THE'},
        {'id':75,'name':'GAZA STRIP'},
        {'id':76,'name':'GEORGIA'},
        {'id':77,'name':'GERMANY'},
        {'id':78,'name':'GHANA'},
        {'id':79,'name':'GIBRALTAR'},
        {'id':80,'name':'GREECE'},
        {'id':81,'name':'GREENLAND'},
        {'id':82,'name':'GRENADA'},
        {'id':83,'name':'GUADELOUPE'},
        {'id':84,'name':'GUAM'},
        {'id':85,'name':'GUATEMALA'},
        {'id':86,'name':'GUERNSEY'},
        {'id':87,'name':'GUINEA'},
        {'id':88,'name':'GUINEA-BISSAU'},
        {'id':89,'name':'GUYANA'},
        {'id':90,'name':'HAITI'},
        {'id':91,'name':'HONDURAS'},
        {'id':92,'name':'HONG KONG'},
        {'id':93,'name':'HUNGARY'},
        {'id':94,'name':'ICELAND'},
        {'id':95,'name':'INDIA'},
        {'id':96,'name':'INDONESIA'},
        {'id':97,'name':'IRAN'},
        {'id':98,'name':'IRAQ'},
        {'id':99,'name':'IRELAND'},
        {'id':100,'name':'ISLE OF MAN'},
        {'id':101,'name':'ISRAEL'},
        {'id':102,'name':'ITALY'},
        {'id':103,'name':'JAMAICA'},
        {'id':104,'name':'JAPAN'},
        {'id':105,'name':'JERSEY'},
        {'id':106,'name':'JORDAN'},
        {'id':107,'name':'KAZAKHSTAN'},
        {'id':108,'name':'KENYA'},
        {'id':109,'name':'KIRIBATI'},
        {'id':110,'name':'KOREA, NORTH'},
        {'id':111,'name':'KOREA, SOUTH'},
        {'id':112,'name':'KUWAIT'},
        {'id':113,'name':'KYRGYZSTAN'},
        {'id':114,'name':'LAOS'},
        {'id':115,'name':'LATVIA'},
        {'id':116,'name':'LEBANON'},
        {'id':117,'name':'LESOTHO'},
        {'id':118,'name':'LIBERIA'},
        {'id':119,'name':'LIBYA'},
        {'id':120,'name':'LIECHTENSTEIN'},
        {'id':121,'name':'LITHUANIA'},
        {'id':122,'name':'LUXEMBOURG'},
        {'id':123,'name':'MACAU'},
        {'id':124,'name':'MACEDONIA'},
        {'id':125,'name':'MADAGASCAR'},
        {'id':126,'name':'MALAWI'},
        {'id':127,'name':'MALAYSIA'},
        {'id':128,'name':'MALDIVES'},
        {'id':129,'name':'MALI'},
        {'id':130,'name':'MALTA'},
        {'id':131,'name':'MARSHALL ISLANDS'},
        {'id':132,'name':'MARTINIQUE'},
        {'id':133,'name':'MAURITANIA'},
        {'id':134,'name':'MAURITIUS'},
        {'id':135,'name':'MAYOTTE'},
        {'id':136,'name':'MEXICO'},
        {'id':137,'name':'MICRONESIA, FED. ST.'},
        {'id':138,'name':'MOLDOVA'},
        {'id':139,'name':'MONACO'},
        {'id':140,'name':'MONGOLIA'},
        {'id':141,'name':'MONTSERRAT'},
        {'id':142,'name':'MOROCCO'},
        {'id':143,'name':'MOZAMBIQUE'},
        {'id':144,'name':'NAMIBIA'},
        {'id':145,'name':'NAURU'},
        {'id':146,'name':'NEPAL'},
        {'id':147,'name':'NETHERLANDS'},
        {'id':148,'name':'NETHERLANDS ANTILLES'},
        {'id':149,'name':'NEW CALEDONIA'},
        {'id':150,'name':'NEW ZEALAND'},
        {'id':151,'name':'NICARAGUA'},
        {'id':152,'name':'NIGER'},
        {'id':153,'name':'NIGERIA'},
        {'id':154,'name':'N. MARIANA ISLANDS'},
        {'id':155,'name':'NORWAY'},
        {'id':156,'name':'OMAN'},
        {'id':157,'name':'PAKISTAN'},
        {'id':158,'name':'PALAU'},
        {'id':159,'name':'PANAMA'},
        {'id':160,'name':'PAPUA NEW GUINEA'},
        {'id':161,'name':'PARAGUAY'},
        {'id':162,'name':'PERU'},
        {'id':163,'name':'PHILIPPINES'},
        {'id':164,'name':'POLAND'},
        {'id':165,'name':'PORTUGAL'},
        {'id':166,'name':'PUERTO RICO'},
        {'id':167,'name':'QATAR'},
        {'id':168,'name':'REUNION'},
        {'id':169,'name':'ROMANIA'},
        {'id':170,'name':'RUSSIA'},
        {'id':171,'name':'RWANDA'},
        {'id':172,'name':'SAINT HELENA'},
        {'id':173,'name':'SAINT KITTS & NEVIS'},
        {'id':174,'name':'SAINT LUCIA'},
        {'id':175,'name':'ST PIERRE & MIQUELON'},
        {'id':176,'name':'SAINT VINCENT AND THE GRENADINES'},
        {'id':177,'name':'SAMOA'},
        {'id':178,'name':'SAN MARINO'},
        {'id':179,'name':'SAO TOME & PRINCIPE'},
        {'id':180,'name':'SAUDI ARABIA'},
        {'id':181,'name':'SENEGAL'},
        {'id':182,'name':'SERBIA'},
        {'id':183,'name':'SEYCHELLES'},
        {'id':184,'name':'SIERRA LEONE'},
        {'id':185,'name':'SINGAPORE'},
        {'id':186,'name':'SLOVAKIA'},
        {'id':187,'name':'SLOVENIA'},
        {'id':188,'name':'SOLOMON ISLANDS'},
        {'id':189,'name':'SOMALIA'},
        {'id':190,'name':'SOUTH AFRICA'},
        {'id':191,'name':'SPAIN'},
        {'id':192,'name':'SRI LANKA'},
        {'id':193,'name':'SUDAN'},
        {'id':194,'name':'SURINAME'},
        {'id':195,'name':'SWAZILAND'},
        {'id':196,'name':'SWEDEN'},
        {'id':197,'name':'SWITZERLAND'},
        {'id':198,'name':'SYRIA'},
        {'id':199,'name':'TAIWAN'},
        {'id':200,'name':'TAJIKISTAN'},
        {'id':201,'name':'TANZANIA'},
        {'id':202,'name':'THAILAND'},
        {'id':203,'name':'TOGO'},
        {'id':204,'name':'TONGA'},
        {'id':205,'name':'TRINIDAD & TOBAGO'},
        {'id':206,'name':'TUNISIA'},
        {'id':207,'name':'TURKEY'},
        {'id':208,'name':'TURKMENISTAN'},
        {'id':209,'name':'TURKS & CAICOS IS'},
        {'id':210,'name':'TUVALU'},
        {'id':211,'name':'UGANDA'},
        {'id':212,'name':'UKRAINE'},
        {'id':213,'name':'UNITED ARAB EMIRATES'},
        {'id':214,'name':'UNITED KINGDOM'},
        {'id':215,'name':'UNITED STATES'},
        {'id':216,'name':'URUGUAY'},
        {'id':217,'name':'UZBEKISTAN'},
        {'id':218,'name':'VANUATU'},
        {'id':219,'name':'VENEZUELA'},
        {'id':220,'name':'VIETNAM'},
        {'id':221,'name':'VIRGIN ISLANDS'},
        {'id':222,'name':'WALLIS AND FUTUNA'},
        {'id':223,'name':'WEST BANK'},
        {'id':224,'name':'WESTERN SAHARA'},
        {'id':225,'name':'YEMEN'},
        {'id':226,'name':'ZAMBIA'},
        {'id':227,'name':'ZIMBABWE'},
        ]}
        
      }
  