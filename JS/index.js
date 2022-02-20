var booklist = document.querySelector('.box')
var itemtemplet = document.getElementById('booksitemtemolate').content

var openmodal = document.querySelector('.openmodal')
var searelemant = document.getElementById('search')

var countEl = document.querySelector('.counts')
var resalt = document.querySelector('.itemresalt')
var sortbtn = document.querySelector('.rendersort')



var logoutbtn = document.querySelector('.regs__btn')
logoutbtn.addEventListener('click',event=>{
   console.log( event.target.matches('regs__btn'))
   window.localStorage.clear()
    
})

const APIKEY ='https://www.googleapis.com/books/v1/volumes?q=search+'
function getbooks(page=1){
    return new Promise((resolve,reject)=>{
        fetch(`${APIKEY}terns=${page}`)
        .then(res=> res.json())
        .then(res=>{
            console.log(res)
            renderbooks(res,booklist)
        })
        .catch(err => reject((err)))
    // alert(err)
        
    })
}
getbooks()

function renderbooks(books,node){
    node.innerHTML="";
    let booksfragment=document.createDocumentFragment()
    for(let i =0; i<10;i++){

        // sortbtn.addEventListener('click',event =>{
        //     books.items[i].volumeInfo.publishedDate
        // })
        //    console.log(yearsort( books.items[i]))
        // function yearsort(books){
        //     let newsort = books.sort((frist,second)=>{
        //       return second. books.items[i].volumeInfo.publishedDate-frist. books.items[i].volumeInfo.publishedDate
        //     })
        //    renderbooks(newsort)
        // }

        resalt.textContent=books.totalItems
        resalt.style.color='red'

        let booksitemEl = document.importNode(itemtemplet,true)

        let titel = books.items[i].volumeInfo.title
        booksitemEl.querySelector('.card__titel').textContent=titel
        
        let image = books.items[i].volumeInfo.imageLinks.thumbnail
        // console.log(image)
       let imgEl = booksitemEl.querySelector('.card__img')
        imgEl.setAttribute('src',image)

        let textEl =books.items[i].volumeInfo.publisher
        booksitemEl.querySelector('.card__text').textContent=textEl

        let yearEl = books.items[i].volumeInfo.publishedDate
        booksitemEl.querySelector('.card__year').textContent=yearEl

        let idEl = books.items[i].id
       
        let discrip =  books.items[i].volumeInfo.description
        let bookmebtn = booksitemEl.querySelector('.bmark-btn')
        bookmebtn.addEventListener('click',event=>{
            window.localStorage.setItem('dataset',idEl)
            bookmebtn.dataset=idEl
            console.log(idEl)
        console.log(event.target.matches('.bmark-btn'))

        var divEl = document.createElement('div')
        divEl.style.width='100%'
        divEl.style.alignItems='center'
        divEl.style.borderRadius='5px'
        divEl.style.background='#EDF3F8'
        divEl.style.margin='5px 0px'
        divEl.textContent= titel
        divEl.style.display='flex'

        let imageELL = document.createElement('img')
        imageELL.style.width='25px'
        imageELL.style.height='20px'
        imageELL.style.margin='10px'
        imageELL.setAttribute('src',"./img/openbok.png")
        
        let imgbtn = document.createElement('img')
        imgbtn.style.margin='10px'
        imgbtn.setAttribute('src',"./img/deletbtn.png")

        imgbtn.addEventListener('click',event=>{
            divEl.innerHTML=null
            window.localStorage.removeItem('dataset')
        })

        divEl.append(imageELL)
        divEl.appendChild(imgbtn)
    countEl.appendChild(divEl)

        })

        let morebtn = booksitemEl.querySelector('.more-btn')
        morebtn.addEventListener('click',event =>{
            morebtn.dataset=idEl
            window.localStorage.setItem('morebtn',idEl)
            console.log(idEl)
           let divmodal = document.createElement('div')
           divmodal.style.width='450px'
           divmodal.style.opacity='1'
           divmodal.style.boxShadow=' rgba(0, 0, 0, 0.4) 0px 30px 90px'
           divmodal.style.height='1855px'
           divmodal.style.top='0'
           divmodal.style.justifyContent='center'
           divmodal.style.padding='30px'
           divmodal.style.right='0'
           divmodal.style.display='block'
           divmodal.style.background='white'
           divmodal.style.position='absolute'
           let divtext = document.createElement('p')
           divtext.textContent=discrip

           let modaltitel = document.createElement('h2')
           modaltitel.style.position='absolute'
           modaltitel.style.marginRight='60px'
           modaltitel.textContent=titel
          
           let imgElM= document.createElement('img')
           imgElM.style.width='190px'
           imgElM.style.margin='80px 100px'
           imgElM.setAttribute('src',image)
            
          let deletbtn = document.createElement('button')
          deletbtn.style.marginLeft='370px'
          deletbtn.style.border='none'
          deletbtn.style.top='0px'
          deletbtn.style.background='white'
          deletbtn.style.fontSize='30px'
          deletbtn.textContent = 'x'
          deletbtn.addEventListener('click',event=>{
              divmodal.innerHTML=null
              divmodal.style.opacity='0'
              divmodal.style.zIndex='-1'
              window.localStorage.removeItem('morebtn')
          })

            console.log(event.target.matches('.more-btn'))
            divmodal.appendChild(modaltitel)
            divmodal.appendChild(deletbtn)
            divmodal.appendChild(imgElM)
            divmodal.append(divtext)
            document.body.appendChild(divmodal)
        })

      booksfragment.appendChild(booksitemEl)
      renderpagenaton()
    }
    node.appendChild(booksfragment)
}

let page = 1

function renderpagenaton(){

    var pireoueEl = document.getElementById('pirevious')
    var pagecorrent=document.getElementById('correntbtn')
    var nextEl = document.getElementById('next')
    
    pagecorrent.textContent=page

    pireoueEl.addEventListener('click',event=>{
        if(page !=1){
            page=page-1
            pagecorrent.textContent=page
           try{
               getbooks(page)
           } catch (error){
               console.log(error)
           }
        }

    })
    nextEl.addEventListener('click',() =>{
        if(page !=10){
            page=page+1
            pagecorrent.textContent=page
            console.log(nextEl)
            try{
                getbooks(page)

            }catch (error) {
              console.log(error)
            }
            console.log('page :'+page)

        }
    })
    return page
}


