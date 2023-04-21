let int1 = document.querySelector(".int1")
let btn = document.querySelector(".btn")
let forms = document.querySelector(".forms")
let int2 = document.querySelector(".int2")
let cord = document.querySelector(".cord")
let delform = document.querySelector("#del")
let cards = document.querySelector(".cards")
let msg = document.querySelector(".msg")
let formstwo = document.querySelector(".formstwo")
let updatebtn = document.querySelector(".updatebtn")


cord.addEventListener("click",()=>{
    forms.classList.add("show")
    btn.innerText='send'


})
delform.addEventListener("click",()=>{
    forms.classList.remove("show")
    int1.value=""
    int2.innerText=""
})



  btn.addEventListener("click",(e)=>{
    if(btn.innerText=="send"){

      if(int1.value && int2.value){

        fetch("http://localhost:4000/posts", {
          method: 'POST',
          body: JSON.stringify({
            title: `${int1.value}`,
            body: `${int2.value}`,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
  
      }
      

    }


    
})


  





window.addEventListener("DOMContentLoaded",()=>{
  fetch('http://localhost:4000/posts')
    .then(data => data.json())
    .then(values=> {
      
      for (let i = 0; i < values.length; i++) {
        let div = document.createElement("div")
        div.className = "listdivs"
        let titles = document.createElement("h3")
        titles.className = "titles"
        let para = document.createElement("p")
        para.className = "content"
        let delbtn = document.createElement("button")
        delbtn.className = "delbtn"
        delbtn.setAttribute("id", values[i].id);
        let editbtn = document.createElement("button")
        editbtn.className = "editbtn"
        editbtn.setAttribute("id", values[i].id);
        let div2 = document.createElement("div")

        btn.setAttribute("id", values[i].id);


      titles.innerText =values[i].title
      para.innerText = values[i].body
      delbtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
      editbtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'




      cards.appendChild(div)
      div.appendChild(titles)
      div.appendChild(para)
      div.appendChild(div2)
      div2.appendChild(delbtn)
      div2.appendChild(editbtn)




      delbtn.addEventListener("click",(e)=>{
        // alert("hi")

       let target = e.target.parentElement.id;


        fetch(`http://localhost:4000/posts/${target}`, {

        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        })

      })

     

      editbtn.addEventListener("click",(e)=>{
        forms.classList.add("show")
        btn.innerText = "UPDATE"

        let targets = e.target.parentElement.id;
        fetch(`http://localhost:4000/posts/${targets}`)
        .then(editdata => editdata.json())
        .then(editvalue=> {

          // console.log(editvalue);
          int1.value = editvalue.title
          int2.innerHTML = editvalue.body

        })
      })
      

      btn.addEventListener("click",(e)=>{
        if(btn.innerText == "UPDATE" ){
          // alert("hi")
          // console.log(e.target.id);
          let editid =  e.target.id

          fetch(`http://localhost:4000/posts/${editid}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: `${int1.value}`,
            body: `${int2.value}`,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
          


        }
      })
      

    }

      
    })
})