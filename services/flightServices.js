import http from './httpServices'
import config from '../config.json'
import Flights from '../components/flights'

const apiendPoint=config.apiendPoint+'/general_flights'
export function getFlights(){
    return http.get(apiendPoint)
  }

  const apiendPoint5=config.apiendPoint+'/aircompany_updateflight'

    export function getUpdateFlights(){
        return http.get(apiendPoint5)
      }
    
    function getUrlt(id){
      return `${apiendPoint5}/${id}`;
    }
    export function getUpdateFlight(id){
        return http.get(getUrlt(id))
    }
    export function saveFlight(flight){
        
        //exists
    if(flight.id){
          // '/cars/id'
      const body = {...flight};
      delete body.id
      return http.put(getUrlt(flight.id), body)
      }
    }
    export function getAirlinesComp(){
      return {'data':[
        {'id':8,'name':'ACM AIR CHARTER GMBH'},
        {'id':113,'name':'AEGEAN AIRLINES'},
        {'id':94,'name':'AEROFLOT RUSSIAN AIRLINES'},
        {'id':30,'name':'AEROLINEAS ARGENTINAS'},
        {'id':38,'name':'AIR BELGIUM'},
        {'id':23,'name':'AIR CANADA'},
        {'id':40,'name':'AIR CHINA'},
        {'id':26,'name':'AIR FRANCE'},
        {'id':27,'name':'AIR HAWAII'},
        {'id':28,'name':'AIR INDIA'},
        {'id':75,'name':'AIR JAPAN'},
        {'id':29,'name':'AIR SPIRIT'},
        {'id':22,'name':'ALASKA AERONAUTICAL'},
        {'id':31,'name':'ALASKA AIRLINES'},
        {'id':24,'name':'ALASKA CENTRAL AIRWAYS'},
        {'id':61,'name':'ALASKA CENTRAL EXPRESS'},
        {'id':65,'name':'ALASKA ISLAND AIR'},
        {'id':57,'name':'ALASKA SEAPLANE SERVICE'},
        {'id':83,'name':'ALIA-(THE) ROYAL JORDANIAN'},
        {'id':115,'name':'ALITALIA'},
        {'id':49,'name':'ALLEGIANT AIR'},
        {'id':21,'name':'AMERICAN AIRLINES'},
        {'id':111,'name':'ARKIA AIRLINES'},
        {'id':77,'name':'AUSTRIAN AIRLINES'},
        {'id':109,'name':'BLUE AIR'},
        {'id':112,'name':'BLUE BIRD AIRLINES'},
        {'id':17,'name':'BRITISH AIRTOURS LIMITED'},
        {'id':36,'name':'BRITISH AIRWAYS'},
        {'id':97,'name':'BRITISH CARIBBEAN AIRWAYS'},
        {'id':37,'name':'BRITISH MIDLAND AIRWAYS'},
        {'id':88,'name':'BRUSSELS AIRLINES'},
        {'id':39,'name':'CARGOLUX ITALIA SPA'},
        {'id':41,'name':'CHALLENGE AIR LUFTVERKEHRS GMBH'},
        {'id':42,'name':'CHINA CARGO AIRLINE'},
        {'id':72,'name':'CHINA EASTERN AIRLINES'},
        {'id':44,'name':'CHINA SOUTHERN AIRLINES'},
        {'id':3,'name':'COMLUX AVIATION'},
        {'id':34,'name':'COMPAGNIA AEREA ITALIANA'},
        {'id':76,'name':'CZECH AIRLINES'},
        {'id':7,'name':'DCA'},
        {'id':45,'name':'DELTA AIR LINES'},
        {'id':46,'name':'EAST INDIANA AVIATION SALE'},
        {'id':107,'name':'EASYJET SWITZERLAND'},
        {'id':71,'name':'EGYPTAIR'},
        {'id':68,'name':'EL AL ISRAEL AIRLINES'},
        {'id':47,'name':'EMIRATES'},
        {'id':33,'name':'FINNAIR'},
        {'id':5,'name':'FLAIR AIRLINES'},
        {'id':52,'name':'FRIENDSHIP AIR ALASKA'},
        {'id':48,'name':'FRONTIER AIRLINES'},
        {'id':55,'name':'GLOBAL JET'},
        {'id':104,'name':'HAWAII PACIFIC AIR'},
        {'id':43,'name':'HAWAII PACIFIC HELICOPTERS'},
        {'id':51,'name':'HAWAIIAN AIRLINES'},
        {'id':54,'name':'IBERIA AIR LINES'},
        {'id':56,'name':'INDIANA AIRWAYS'},
        {'id':9,'name':'INTER ISLAND AIRWAYS'},
        {'id':103,'name':'ISLAND AIR HAWAII'},
        {'id':25,'name':'ISLAND AIRLINES HAWAII'},
        {'id':20,'name':'JET AIRWAYS'},
        {'id':35,'name':'JETBLUE AIRWAYS'},
        {'id':11,'name':'JETCLUB AG'},
        {'id':60,'name':'KLM ROYAL DUTCH AIRLINES'},
        {'id':59,'name':'KOREAN AIR LINES'},
        {'id':18,'name':'LAN ARGENTINA'},
        {'id':73,'name':'LAUDA AIR LUFTFAHRT'},
        {'id':50,'name':'LUFTHANSA CARGO AIRLINES'},
        {'id':62,'name':'LUFTHANSA GERMAN AIRLINES'},
        {'id':66,'name':'LUFTRANSPORT-UNTERNEHMEN'},
        {'id':69,'name':'MALEV HUNGARIAN AIRLINES'},
        {'id':4,'name':'MASTER TOP LINHAS AEREAS'},
        {'id':13,'name':'METROPIX UK'},
        {'id':70,'name':'MONTANA AUSTRIA FLUGETRIEB'},
        {'id':14,'name':'MULTI-AERO'},
        {'id':15,'name':'OPEN SKIES'},
        {'id':105,'name':'PACIFIC ALASKA AIRLINES'},
        {'id':79,'name':'PACIFIC SOUTHWEST AIRLINES'},
        {'id':114,'name':'PEGASUS AIRLINES'},
        {'id':10,'name':'POLAR AIRLINES DE MEXICO'},
        {'id':63,'name':'POLSKIE LINIE LOTNICZE'},
        {'id':80,'name':'QATAR AIRWAYS'},
        {'id':85,'name':'REEVE AIR ALASKA'},
        {'id':32,'name':'ROYAL AIR MAROC'},
        {'id':82,'name':'ROYAL HAWAIIAN AIRWAYS'},
        {'id':81,'name':'RYAN INTERNATIONAL AIRLINES'},
        {'id':89,'name':'SABENA BELGIAN WORLD'},
        {'id':87,'name':'SCANDINAVIAN AIRLINES'},
        {'id':86,'name':'SEAIR ALASKA AIRLINES'},
        {'id':58,'name':'SEAPORT AIRLINES'},
        {'id':92,'name':'SINGAPORE AIRLINES'},
        {'id':101,'name':'SOUTHEAST ALASKA AIRLINES'},
        {'id':102,'name':'SOUTHWEST AIRLINES'},
        {'id':74,'name':'SPIRIT AIR LINES'},
        {'id':91,'name':'SPIRIT HELICOPTER'},
        {'id':6,'name':'SWIFT AIR'},
        {'id':16,'name':'SWISS AIR AMBULANCE'},
        {'id':67,'name':'SWISS INTERNATIONAL AIRLINES'},
        {'id':90,'name':'SWISS WORLD AIRWAYS'},
        {'id':93,'name':'SWISSAIR TRANSPORT'},
        {'id':84,'name':'TAROM ROMANIAN AIR TRANSPORT'},
        {'id':64,'name':'THE HAWAII EXPRESS'},
        {'id':1,'name':'TITAN AIRWAYS'},
        {'id':2,'name':'TRADEWIND AVIATION'},
        {'id':96,'name':'TRANS AIR (HAWAII)'},
        {'id':53,'name':'TRANSAVIA HOLLAND'},
        {'id':95,'name':'TUI AIRLINES BELGIUM JETAIRFLY'},
        {'id':110,'name':'TURKISH AIRLINES'},
        {'id':78,'name':'UKRAINE INTERNATIONAL AIRLINES'},
        {'id':98,'name':'UNITED AIR LINES'},
        {'id':12,'name':'VISION AIRLINES'},
        {'id':99,'name':'VISTAJET LUFTFAHRTUNTERNEHMEN GMBH'},
        {'id':100,'name':'WIEN AIR ALASKA'},
        {'id':108,'name':'WIZZ AIR HUNGARY'},
        {'id':19,'name':'YUTE AIR AKA FLIGHT ALASKA'},
        {'id':106,'name':'ZAS AIRLINE OF EGYPT'},
        
      ]}
    }

    const apiendPoint6=config.apiendPoint+'/aircompany_register1'
    export function flregister(flight,airline_id){
    const data={
      airline_company_id:airline_id,
      origin_country_id:flight.origin_country_id,
      destination_country_id:flight.destination_country_id,
      departure_time:flight.departure_time,
      landing_time:flight.landing_time,
      remaining_tickets:flight.remaining_tickets
    }
       return http.post(apiendPoint6,data)
      }
     