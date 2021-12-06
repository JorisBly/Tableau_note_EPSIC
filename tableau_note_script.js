let grades = {}
let selects = null


window.addEventListener('load', () => {
    selects = document.getElementsByTagName("select")

    if (localStorage.getItem('storageGrades') === null) {
        getGradesFromHTML()

    } else {
        grades = JSON.parse(localStorage.getItem('storageGrades'))

        updateGradeOnHTML()
        displayAverageOnHTML()
        getGradesFromHTML()

    }
    attachedAListenerToSelect()


});


//Aller chercher les ids et valeurs des moyennes//

function getGradesFromHTML() {
    for (let select of selects) {
        grades[select.id] = parseFloat(select.value)

        localStorage.setItem('storageGrades', JSON.stringify(grades))

    }


//Tableau moyenne//

    let tableMathEng = [
        grades["grade_MATH_1"],
        grades["grade_MATH_2"],
        grades["grade_MATH_3"],
        grades["grade_ENG_1"],
        grades["grade_ENG_2"],
        grades["grade_ENG_3"],
        grades["grade_ENG_4"],
        grades["grade_ENG_5"]
    ]

    let tableECG = [
        grades["grade_ECG_1"],
        grades["grade_ECG_2"],
        grades["grade_ECG_3"],
        grades["grade_ECG_1"],
        grades["grade_ECG_2"],
        grades["grade_ECG_3"],
        grades["grade_ECG_4"],
        grades["grade_ECG_5"],
        grades["grade_ECG_6"],
        grades["grade_ECG_7"],
        grades["grade_ECG_8"]
    ]


    let tableICT = [
        grades["grade_MOD"],
        grades["grade_CIE"],
    ]


    let weightAll = [
        grades["weight_BE"],
        grades["weight_ECG"],
        grades["weight_ICT"],
        grades["weight_TPI"],

    ]


    let weightICT = [80, 20]


    let averageMathEng = roundNumber(arrayAvg(tableMathEng), 0.5)

    let averageECG = roundNumber(arrayAvg(tableECG), 0.5)

    let averageICT = roundNumber(GradeWithWeight(tableICT, weightICT), 0.1)




    let tableAll = [
        averageMathEng,
        averageECG,
        averageICT,
        grades["average_TPI"],
    ]


    let averageCFC = roundNumber(GradeWithWeight(tableAll, weightAll), 0.1)

    let result = passOrFailure(averageCFC)

    displayAverageOnHTML(
        averageMathEng,
        averageECG,
        averageICT,
        averageCFC,
        result
    )

}


function attachedAListenerToSelect() {
    for (let select of selects) {
        select.addEventListener("change", getGradesFromHTML)
    }


    console.log(grades)

}


function displayAverageOnHTML(averageMathEng, averageECG, averageICT, averageCFC, result) {
    document.getElementById("average_CG").innerText = onlyIfNumber(averageECG)
    document.getElementById("average_CB").innerText = onlyIfNumber(averageMathEng)
    document.getElementById("average_ICT").innerText = onlyIfNumber(averageICT)
    document.getElementById("grades_CFC").innerText = onlyIfNumber(averageCFC)
    document.getElementById("passorfailure").innerHTML = (result)

}


//moyenne des notes depuis les tableaux//
function arrayAvg(myArray) {

    let sum = 0
    let divide = 0

    for (let i = 0; i < myArray.length; i++) {
        if (!isNaN(myArray[i])) {
            sum = sum + myArray[i];
            divide++
        }
    }

    return sum / divide

}


//moyenne avec pondération//

function GradeWithWeight(average, weight) {

    console.log("Avg", average)
    console.log("W", weight)

    let sum = 0
    let divide = 0

    for (let i = 0; i <= average.length; i++) {
        if (!isNaN(average[i])) {
            sum = sum + (average[i] * weight[i]);
            divide += weight[i]


        }

    }
    return sum / divide
}


//arrondir notes//

function roundNumber(number, multiple) {
    return (Math.round(number / multiple) * multiple)
}


function onlyIfNumber(number) {
    if (number === null || isNaN(number) || number === undefined) {
        return "-"
    } else {
        return number.toFixed(1)

    }
}


//mettre à jour les inputs si ils existent pour qu ils rest dans l'html//

function updateGradeOnHTML() {
    for (let updateGrades in grades) {
        document.getElementById(updateGrades).value = grades[updateGrades] ?? "Note"
    }
}

function passOrFailure(average) {

    if (average >= 4.5) {
        return "Bien ouej"
    } else {
        return "Peut faire mieux"
    }

}

