import './style.css';
import 'material-icons';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
import { getAssistantMessage } from './GuiAIRecife';



(function() {
    var chatSubmit = document.querySelector("#chat-submit");
    chatSubmit.addEventListener("click", function(e) {sendMessage(e)});


    var storedKey = localStorage.getItem('openaiKey');
    if (storedKey && storedKey.trim() != "") {
        document.querySelector("#api-input").value = storedKey;
    }

    var settingsSubmit = document.querySelector("#settings-submit");
    settingsSubmit.addEventListener("click", function(e) {
        // prevent the default behavior of the event
        e.preventDefault();

        var openaiKey = document.querySelector("#api-input").value;
        if (openaiKey.trim() == "") {
            return false;
        }

        localStorage.setItem('openaiKey', openaiKey)
      });
  
  
    document.body.addEventListener("click", function(e) {
      // check if the target element has the chat-btn class name
      if (e.target.classList.contains("chat-btn")) {
        // get the chat-value and innerHTML of the target element
        var value = e.target.getAttribute("chat-value");
        var name = e.target.innerHTML;
        // select the chat-input element by its id and set its disabled attribute to false
        document.querySelector("#chat-input").setAttribute("disabled", false);
        // call the generate_message function with the name and self type
        generate_message(name, "user");
      }
    });
  
    // select the chat-circle element by its id and add a click event listener to it
    document.querySelector("#settings-circle").addEventListener("click", function() {
        // toggle the scale class name for the chat-circle element
        this.classList.toggle("hidden");
        document.querySelector("#chat-circle").classList.toggle("hidden");
        // toggle the scale class name for the chat-box element
        document.querySelector(".settings-box").classList.toggle("hidden");
        document.querySelector("#chat-overlay").classList.toggle("hidden");
      });

      // select the chat-box-toggle element by its class name and add a click event listener to it
    document.querySelector(".settings-box-toggle").addEventListener("click", function() {
        // toggle the scale class name for the chat-circle element
        document.querySelector("#chat-circle").classList.toggle("hidden");
        document.querySelector("#settings-circle").classList.toggle("hidden");
        // toggle the scale class name for the chat-box element
        document.querySelector(".settings-box").classList.toggle("hidden");
        document.querySelector("#chat-overlay").classList.toggle("hidden");
      });
    

    // select the chat-circle element by its id and add a click event listener to it
    document.querySelector("#chat-circle").addEventListener("click", function() {
      // toggle the scale class name for the chat-circle element
      this.classList.toggle("hidden");
      document.querySelector("#settings-circle").classList.toggle("hidden");
      // toggle the scale class name for the chat-box element
      document.querySelector(".chat-box").classList.toggle("hidden");
      document.querySelector("#chat-overlay").classList.toggle("hidden");
    });
  
    // select the chat-box-toggle element by its class name and add a click event listener to it
    document.querySelector(".chat-box-toggle").addEventListener("click", function() {
      // toggle the scale class name for the chat-circle element
      document.querySelector("#chat-circle").classList.toggle("hidden");
      document.querySelector("#settings-circle").classList.toggle("hidden");
      // toggle the scale class name for the chat-box element
      document.querySelector(".chat-box").classList.toggle("hidden");
      document.querySelector("#chat-overlay").classList.toggle("hidden");
    });
  })();
  
  async function sendMessage(e) {
    e.preventDefault();
    var msg = document.querySelector("#chat-input").value;
    if (msg.trim() == "") {
      return false;
    }
    
    generate_message(msg, "user");
    var assistantMessage = await getAssistantMessage(msg, getMessageHistory());
    generate_message(assistantMessage.content.replaceAll('\n','<br/>'), assistantMessage.role);
  }
  
  var INDEX = 0;
  function generate_message(msg, type) {
    INDEX++;

    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class='chat-msg " + type + "'>";
    str += "  <div class='cm-msg-text'>";
    str += msg;
    str += "  </div>";
    str += "</div>";
    document.querySelector(".chat-logs").innerHTML += str;
    document.querySelector("#cm-msg-" + INDEX).style.display = "block";
    
    if (type == "user") {
      // select the chat-input element by its id and set its value to empty
      document.querySelector("#chat-input").value = "";
    }
    // select the chat-logs element by its class name and scroll it to the bottom
    document.querySelector(".chat-logs").scrollTop =
      document.querySelector(".chat-logs").scrollHeight;
  }
  
  function getMessageHistory() {
    // Janela deslizante de histórico 
    const maxHistory = 50;
    let historyWindow = 0;
    if (INDEX > maxHistory) {
      historyWindow = INDEX - maxHistory;
    }
    
    var messages = new Array();
    for (let i = INDEX-1; i > historyWindow; i--) {
      var msgElement = document.querySelector('#cm-msg-' + i);
      
      messages.push({
        content: msgElement.children[0].innerHTML,
        role: msgElement.classList[1]
      })
    }

    return messages.reverse();
}
