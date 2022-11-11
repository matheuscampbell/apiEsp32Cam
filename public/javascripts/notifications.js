function garanteeNotification() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
}

function notify(title, body, icon) {
  garanteeNotification();
  var notification = new Notification(title, {
    icon: icon,
    body: body,
  });
}

function fetchNotifications() {
    var token = readCookie("token");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", APIURL+"/notifications", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var notifications = JSON.parse(xhr.responseText);
            var notificationsDiv = document.getElementById("notifications");
            notificationsDiv.innerHTML = "";
            notifications.forEach(function(notification){
                notify(notification.title, notification.message, notification.icon);
            });
        }else{
            alert("Falha ao buscar notificações");
        }
    }
}

