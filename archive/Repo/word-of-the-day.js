    function getToday() {
		//Set the date
		var today = new Date();
		//Return the date object
		return today;

	}

    //Get the day before the date parameter
    function getDayBefore(inputDate) {
        //Subtract one day
        inputDate.setTime(inputDate.getTime() - 24*60*60*1000);
        //Return the new date
        return inputDate;
    }

    function getYesterday() {
        //Subtract one day to get the date yesterday
        const yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - 24*60*60*1000);
        //Return the new date
        return yesterday;
    }

    function getTomorrow() {
        //Add one day to get the date tommorow
        const tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 24*60*60*1000);
        //Return the new date
        return tomorrow;
    }

    //Function to set the text (inner HTML property) of an element
	function setText(element, phrase) {
		//Set the required element's text (inner HTML) property
		element.innerHTML = phrase;

	}

    //Function to add a class to an element
    function addClass(element, className) {
        element.classList.add(className);
    }

    //Function to create an element
    function createElement(elementName) {
        document.createElement(elementName);
    }

    //Function to format the date into 'yyyy-MM-dd' format
    function formatDate(date) {

        const day = String(date.getDate()).padStart(2, '0');
        //Add one to the month to get it from 1 - 12
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        //Assemble the date in 'yyyy-MM-dd' format
        const formattedDate = year + "-" + month + "-" + day;
        
        //Return the date
        return formattedDate;
    }

	function configureFirebase() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
        apiKey: "AIzaSyANVqen5gem3ef5Mu54lSyuRnaBHLB59oo",
        authDomain: "french-word-of-the-day-1f8ef.firebaseapp.com",
        databaseURL: "https://french-word-of-the-day-1f8ef.firebaseio.com",
        projectId: "french-word-of-the-day-1f8ef",
        storageBucket: "french-word-of-the-day-1f8ef.appspot.com",
        messagingSenderId: "981145687322",
        appId: "1:981145687322:web:a638af67d04766a0ee88a3"
        };

        //Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        //Create database instance
        var db = firebase.firestore();
        
        return db;
}

//Show the details for a word by accessing the properties of its document
function showWordDetails(doc, dateString) {
        dateString = dateString.toUpperCase();
        //Create a current word div
        const currentWordDiv = document.createElement("DIV");
        
        
        //Create the word details div
        const wordDetailsDiv = document.createElement("DIV");
   
        
        //Create the word date text element
        const dateText = document.createElement("H3");
        
        
        //Create the french word text element
        var frenchWord = document.createElement("H2");
        
        
        //Create the word type element
        const wordType = document.createElement("P");
        
        
        //Create the word gender element
        const wordGender = document.createElement("P");
        
        
        //Create the english word text element
        const englishWord = document.createElement("H2");
        
        //Create the example sentences div
        const exampleSentencesDiv = document.createElement("DIV");
        
        
        //Create the example sentences header
        const exampleSentencesHeader = document.createElement("H3");
        
        
        //Create the French example sentence
        const frenchExampleSentence = document.createElement("P");
        
        
        //Create the English example sentence
        const englishExampleSentence = document.createElement("P");
        
        //Add it to the 'currentWordDiv' class
        addClass(currentWordDiv, "wordDiv");
        //Add it to the 'wordDetails' class
        addClass(wordDetailsDiv, "wordDetails");
        //Add to the 'dateText' class
        addClass(dateText, "dateText");
        //Add to the french word class
        addClass(frenchWord, "frenchWord");
        //Add to the word attributes class
        addClass(wordType, "wordAttributes");
        //Add to the word attributes class
        addClass(wordGender, "wordGender");
        //Add to the english word class
        addClass(englishWord, "englishWord");
        //Add to the example div class
        addClass(exampleSentencesDiv, "exampleBlock");
        //Add to the example sentences class
        addClass(exampleSentencesHeader, "exampleSentences");
        //Add to the frenchExample class
        addClass(frenchExampleSentence, "frenchExample");
        //Add to the English example class
        addClass(englishExampleSentence, "englishExample");
    
        currentWordDiv.classList.add("showOnScroll");
        
        
        //Add text to word details
        setText(dateText, dateString);
        setText(frenchWord, doc.data()["frenchWord"]);
        setText(wordType, doc.data()["type"]);
        setText(wordGender, doc.data()["gender"]);
        setText(englishWord, doc.data()["englishWord"]);
        
        //Add text to example sentences block
        setText(exampleSentencesHeader, "EXAMPLE SENTENCES");
        setText(frenchExampleSentence, doc.data()["frenchExample"]);
        setText(englishExampleSentence, doc.data()["englishExample"]);
        
        //Add elements to word details div
        wordDetailsDiv.appendChild(dateText); //Create uppercase date
        wordDetailsDiv.appendChild(frenchWord);
        wordDetailsDiv.appendChild(wordType);
        wordDetailsDiv.appendChild(wordGender);
        wordDetailsDiv.appendChild(englishWord);
        
        //Add elements to the example sentences div
        exampleSentencesDiv.appendChild(exampleSentencesHeader);
        exampleSentencesDiv.appendChild(frenchExampleSentence);
        exampleSentencesDiv.appendChild(englishExampleSentence);
    
        //Get main words div (container for all words)
        var wordsDiv = document.getElementById("wordsDiv");
        
        //Add the two divs to the words div
        wordsDiv.appendChild(wordDetailsDiv);
        wordsDiv.appendChild(exampleSentencesDiv);
    
        currentWordDiv.appendChild(wordDetailsDiv);
        currentWordDiv.appendChild(exampleSentencesDiv);
    
        //Add the current word div to the words div
        wordsDiv.appendChild(currentWordDiv);
    
        //Add the word div to the 'showOnScroll' class
        addClass(currentWordDiv, "showOnScroll");
        //addClass(exampleSentencesDiv, "showOnScroll");
        //addClass(exampleSentencesDiv, "showOnScroll");
    
        //If there is no gender for the word, hide it
        if (wordGender.innerHTML == "N/A") {
            wordGender.style.display = "none";
        }
    
        
        
        //Return true, indicating the operation was successful
        //getYesterday(); 
}


function disablePreviousWord() {
    //Disable the previous button
    document.getElementById("backButton").disabled = true;
}

function disableNextWord() {
    //Disable the previous button
    document.getElementById("nextButton").disabled = true;
}

function getWordDetails(db, date) {
    
    return new Promise((resolve) => {
        //Format the date
    const formattedDate = formatDate(date);
    let dateString = date.toDateString();

    //Get the reference to the word
    var docRef = db.collection("words").doc(formattedDate);
    //Read data
    docRef.get().then((doc) => {
        
        //If the document exists
        if (doc.exists) {  
            //Show the document data
            showWordDetails(doc, dateString);
            //Return true, as the request was successful
            resolve(doc.exists);
        } else {
            resolve(doc.exists);
        }
        
          
    }); 
        
    });
    
  }


async function getWordsInRange(db, startingDate, start, end) {
    //Counter
    var i;
    //Set the date for the word which will be retrieved
    let newDate = startingDate;
    //Repeat over the range parameter
    for (i=start;i < end;i++) {
        //Get the word
        let success = await getWordDetails(db, newDate);
        console.log(success);
        
        //If the request was unsuccessful, terminate and return the number of items retrieved (<20)
        if (success == false) {
            console.log(i);
            return i;
        }
        
        //Decrement the date for the next loop (get the word before)
        newDate = getDayBefore(newDate);
        
    }
    //Return the the number of words retrieved
    console.log(i);
    return i;

}

/*function getPreviousWordDetails(db, date) {
        //Format the date
    const formattedDate = formatDate(date);

    //Get the reference to the word
    var docRef = db.collection("words").doc(formattedDate);
    //Read data
    docRef.get().then((doc) => {
        
        //If the document exists
        if (doc.exists) {
            //Show the details for the previous word div
            setText("previousWord", doc.data()["frenchWord"]);
        }
        
        //On failure, disable the previous word tools
        else {
            disablePreviousWord();
        }
        
          
    });   
}*/

/*function getNextWordDetails(db, date) {
        
    //Format the date
    const formattedDate = formatDate(date);

    //Get the reference to the word
    var docRef = db.collection("words").doc(formattedDate);
    //Read data
    docRef.get().then((doc) => {
        
        //If the document exists
        if (doc.exists) {
            //Show the details for the previous word div
            setText("nextWord", doc.data()["frenchWord"]);
        }
        
        //On failure, disable the next word tools
        else {
            disableNextWord();
        }
        
          
    });   
}*/


 /* function getPreviousWords(db) {
  //Read data                                                                                                                                                                                                                               
  db.collection("words").get().then((snapshot) => {
        snapshot.forEach((doc) => {

          //Get the table of previous words
          var table = document.getElementById("previousWordsTable");

          //Create an empty <tr> element at the last position
          var row = table.insertRow(-1);

          //Insert new cells
          var dateCell = row.insertCell(0);
          var frenchCell = row.insertCell(1);
          var englishCell = row.insertCell(2);

          //Add text to page
          //document.getElementById("currentFrenchWord").innerHTML = doc.data()["frenchWord"];
          //document.getElementById("currentWordType").innerHTML = doc.data()["type"];
          //document.getElementById("currentWordGender").innerHTML = doc.data()["gender"];
          //document.getElementById("currentEnglishWord").innerHTML = doc.data()["englishWord"];
          //document.getElementById("frenchExample").innerHTML = doc.data()["frenchExample"];
          //document.getElementById("englishExample").innerHTML = doc.data()["englishExample"];


          dateCell.innerHTML = doc.data()["date"];
          frenchCell.innerHTML = doc.data()["frenchWord"];
          englishCell.innerHTML = doc.data()["englishWord"];
        
});
 
});
}*/