function getData() {
  fetch("http://localhost:3000/index/data").then((res) => {
    console.log(res);
  });

  //   let xhttp = new XMLHttpRequest();
  //   let url = "http://localhost:3000/index/data";
  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {
  //       let data = JSON.parse(this.responseText);
  //       console.log(data);
  //     }
  //   };
  //   xhttp.open("GET", url, true);
  //   xhttp.send();
}
