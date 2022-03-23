const tk = 2;
const programsConfigs = {};

const programsRunningContainer = document.getElementById('programs-running');
const addProgramBtn = document.querySelector('.add-program')
const runProgramsBtn = document.querySelector('#run-programs')

addProgramBtn.addEventListener('click', addProgram)
runProgramsBtn.addEventListener('click', () => {
    runPrograms(programsConfigs)
})


function addProgram() {
    const name = document.getElementById('program-name')
    const start = document.getElementById('program-start')
    const run = document.getElementById('program-run')
    const priority = document.getElementById('program-priority')
    const programsTable = document.getElementById('programs-table')

    if (isProgramNameUnique(name.value, programsConfigs)) {
        alert('Program name must be unique')
        return
    }

    programsTable.innerHTML += `
        <tr>
            <td>${name.value ?? 'Program'}</td>
            <td>${start.value ?? 0}</td>
            <td>${run.value ?? 0}</td>
            <td>${priority.value ?? 0}</td>
        </tr>
    `

    programsConfigs[name.value] = {
        start: start.value,
        run: run.value,
        priority: priority.value
    }

    console.log(programsConfigs);
}


function isProgramNameUnique(program, programs) {
    return getProgramsNames(programs).includes(program)
}

function getProgramsNames(programs) {
    return Object.keys(programs)
}

function runPrograms(programs) {
    const runningTable = document.getElementById('programs-running')
    let counter = 0

    function addRow() {
        let column = '<tr class="programs-running-line">'
        getProgramsNames(programs).forEach(() => {
            column += `<th>${counter++}</th>`
            column += '<th>O</th>'
        })
        column += '</tr>'
        runningTable.innerHTML += column

        setTimeout(addRow, 1_000)
    }

    // TODO: Extract to separate function :start
    let firstColumn = '<tr class="programs-running-line"> <th>Time --> </th>'
    getProgramsNames(programs).forEach(name => {
        firstColumn += `
            <th>${name}</th>
        `
    })
    firstColumn += '</tr>'
    runningTable.innerHTML = firstColumn
    // TODO: Extract to separate function :end

    addRow()
}
