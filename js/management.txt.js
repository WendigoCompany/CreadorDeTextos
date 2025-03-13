
const purify = (d) => {
    d = JSON.stringify(d)
    return d.replaceAll("\\n", "<br/>").replaceAll('"', "")
}

let styles = {
    "color": "#ffffff"
};

const fonts = [
    {
        name: "",
        class: ""
    }
];


const UpdateTxt = (e, i) => {
    const data = e.target.value;
    document.querySelectorAll("p")[i].innerHTML = purify(data);

}


document.querySelectorAll("textarea")[0].oninput = (e) => UpdateTxt(e, 0)
document.querySelectorAll("textarea")[1].oninput = (e) => UpdateTxt(e, 1)


document.querySelectorAll('input[type="color"]')[0].value = styles["color"];
document.querySelectorAll('input[type="color"]')[0].oninput = (e) => {
    document.querySelectorAll("p")[0].style.color = e.target.value
    document.querySelectorAll("p")[1].style.color = e.target.value

    styles["color"] = e.target.value

}



document.querySelectorAll('input[type="checkbox"]')[0].onchange = (e) => {
    if (e.target.checked) {
        document.querySelectorAll("p")[0].style.textAlign = "center";
        document.querySelectorAll("p")[1].style.textAlign = "center";

        styles["textAlign"] = "center";
    } else {
        document.querySelectorAll("p")[0].style.textAlign = "left";
        document.querySelectorAll("p")[1].style.textAlign = "left";

        styles["textAlign"] = "left";
    }
}



document.querySelectorAll('input[type="checkbox"]')[1].onchange = (e) => {
    if (e.target.checked) {
        document.querySelectorAll("p")[0].innerHTML = document.querySelectorAll("p")[0].innerHTML.toUpperCase()
        document.querySelectorAll("p")[1].innerHTML = document.querySelectorAll("p")[0].innerHTML.toUpperCase()

    } else {
        document.querySelectorAll("p")[0].innerHTML = document.querySelectorAll("p")[0].innerHTML.toLowerCase()
        document.querySelectorAll("p")[1].innerHTML = document.querySelectorAll("p")[0].innerHTML.toLowerCase()

    }
}


document.getElementsByName("snum")[0].oninput = (e) => {
    let selected = "";
    for (let i = 0; i < document.getElementsByName("size").length; i++) {
        if (document.getElementsByName("size")[i].checked) {
            selected = document.getElementsByName("size")[i].value
            break
        }

    }
    document.querySelectorAll("p")[0].style.fontSize = `${e.target.value}${selected}`;
    document.querySelectorAll("p")[1].style.fontSize = `${e.target.value}${selected}`;
}

for (let i = 0; i < document.getElementsByName("size").length; i++) {
    document.getElementsByName("size")[i].onchange = (e) => {
        document.querySelectorAll("p")[0].style.fontSize = `${document.getElementsByName("snum")[0].value}${e.target.value}`;
        document.querySelectorAll("p")[1].style.fontSize = `${document.getElementsByName("snum")[0].value}${e.target.value}`;

    }

}


// document.querySelectorAll('input[type="checkbox"]')[3].onchange = (e) => {
//     if (e.target.checked) {
//         const capi = (txt) => {
//             let ntxt = txt;
//             return
//         }

//         document.querySelectorAll("p")[0].innerHTML = capi(document.querySelectorAll("p")[0].innerHTML)


//     } else {
//         document.querySelectorAll("p")[0].innerHTML = document.querySelectorAll("p")[0].innerHTML.toLowerCase()
//     }
// }


let cache = sessionStorage.getItem("cache") || 0;
sessionStorage.setItem("cache", cache)

const dowload_png = async (i = 0) => {
    const langs = 2;
    

    const output = document.getElementById("output");
    output.innerHTML =  document.querySelectorAll("p")[i].innerHTML;

    Object.keys(styles).map(k => {
        output.style[k] = styles[k];
    })
    output.style.display = "block";



    html2canvas(output, {
        backgroundColor: null // No se agrega color de fondo, así se mantiene la transparencia
    }).then(function (canvas) {
        // Convertir el canvas a una imagen PNG con transparencia
        let lang = "";
        switch (i) {
            case 0:
                lang = "es";
                break;
            case 1:
                lang = "en";
                break;

        }
        const imgData = canvas.toDataURL('image/png');

        // Crear un enlace para descargar la imagen
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = `text_${cache}_${lang}.png`;

        downloadLink.click()
        output.style.display = "none";


        if (i + 1 >= langs) {
            cache ++
            sessionStorage.setItem("cache", cache)
        } else {
            dowload_png(i+1)

        }




    });
}



const callCanvas = () => {


}
document.getElementById("save-btn").onclick=()=>{
    dowload_png()
}