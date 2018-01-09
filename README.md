# ProgrammazioneWeb
PROGETTO DI PROGRAMMAZIONE WEB 
- Fedeli Arianna Matr. 093529
- Rosati Marcello Matr. 093335


#LINK TRELLO
https://trello.com/b/AvB0wZyy/inizializzare-progetto-prog-web

#COMANDI DA TERMINALE:
- posizionarsi all'interno della cartella del progetto
- digitare :
    - sudo service mongodb start    //per arrivare il database
    -node FirstToRun.js  //file necessario per popolare il database
    -nodemon server.js     //file necessario per runnare il server
    - tramite browser digitare http://localhost:8080/
    
ACCOUNT E PASSWORD:
ADMIN:
Nome Utente: arianna.fedeli
Password: ari

PROFESSORE:
Nome Utente: marcello.rosati
Password: marce

STUDENTE:
Nome Utente: sara.fedeli
Password: saretta
########################################################

Link della presentazione su youTube
https://youtu.be/MM8XwP5gUp0tube:


########################################################

Link dell'app deployata su Heroku:
NON DEPLOYATA PER PROBLEMI TECNICI COME SPECIFICATO NELLA EMAIL

########################################################

Link ToDo list on Trello:

https://trello.com/b/AvB0wZyy

########################################################

Link SlideShare:

https://www.slideshare.net/Arianna1995/presentazioneprogwb-85281353

########################################################
Descrizione dell'architettura ed organizzazione dei file:

CARTELLA CLIENT:
 - assets : cartella per la gestione del css
 - img: cartella contentente immagini utili al layout del progetto
 - js: cartella contenente tutti i controller e services per il funzionamento lato client
 - view: cartella contente due sottocartelle per i template dell'area riservata(inside) e per la gestione della parte esterna del sito (outside)
 - index.html : file di index per la visualizzazione
 - style.css: foglio di stile

 CARTELLA SERVER:
 - function: cartella contenente tutte le funzioni suddivise per tipologia di utente(studente,admin,prof
 - models: cartella contenente tutto lo schema del database


 -server.js : file per l'inizializzazione del servizio lato server