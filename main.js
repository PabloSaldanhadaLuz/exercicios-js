const etapas = {
    "Etapa I - Escolha do Tema": [
        "O tema foi de interesse de todo o grupo?",
        "Houve diálogo no grupo para a escolha do tema?",
        "O tema foi coerente com a faixa etária do grupo?",
        "O tema foi próximo da realidade dos estudantes?",
        "O tema agregou no ensino e aprendizagem deste grupo na SRM (habilidade de socialização)?",
    ],
    "Etapa II - Pesquisa Exploratória": [
        "Os dados foram obtidos de fontes confiáveis?",
        "A pesquisa teve relação ao tema escolhido pelo grupo?",
        "Houve participação de todos os integrantes do grupo na pesquisa exploratória?",
        "O grupo se dedicou a fazer esta pesquisa, teve recursos bibliográficos ou pesquisa de campo?",
        "A pesquisa exploratória agregou no ensino e aprendizagem de matemática deste grupo na SRM (habilidade de organização e planejamento)?"
    ],
    "Etapa III - Levantamento do(s) Problema(s)": [
        "Os problemas levantados tiveram correlação coerente ao tema escolhido?",
        "Os alunos estavam interessados em responder a esses problemas levantados?",
        "Os problemas são relacionados à cultura e vivência do grupo?",
        "Os conteúdos matemáticos podem ser trabalhados com os problemas levantados?",
        "Os levantamentos dos problemas agregaram no ensino e aprendizagem deste grupo na SRM (habilidade de problematizar)?"
    ],
    "Etapa IV - Resolução do(s) Problema(s) e Desenvolvimento do Conteúdo Matemático": [
        "A resolução inicial dos alunos foi coerente com a pesquisa exploratória?",
        "Houve modelo matemático? Se sim, este modelo foi coerente com uma possível resolução para um ou mais problemas levantados?",
        "O conteúdo matemático trabalhado auxiliou na resolução desse(s) problema(s)?",
        "Teve empenho do grupo ao responder esses problemas e ao descobrir o conteúdo matemático, caso houvesse?",
        "A resolução dos problemas agregou no ensino e aprendizagem de matemática deste grupo na SRM (habilidade de mobilizar conhecimentos sobre conteúdos específicos)?"
    ],
    "Etapa V - Análise Crítica da(s) Solução(ões)": [
        "A análise crítica das soluções foi coerente com o processo de modelagem matemática?",
        "A apresentação das soluções teve participação geral do grupo?",
        "Esta análise levou em conta todas as outras etapas, sendo coerente com o tema, pesquisa exploratória, levantamento e resoluções?",
        "Os conteúdos matemáticos apresentados na análise foram coerentes com as resoluções dos problemas apresentados?",
        "A análise crítica agregou no ensino e aprendizagem deste grupo na SRM (habilidades de comunicação e trabalho em equipe)?"
    ]
};

function criarTabelas() {
    let container = document.getElementById("etapas");
    container.innerHTML = "";
    for (let etapa in etapas) {
        let html = `<h3>${etapa}</h3><table><tr><th>Pergunta</th><th>A</th><th>B</th><th>C</th><th>D</th></tr>`;
        etapas[etapa].forEach((pergunta, index) => {
            html += `<tr>
                <td>${pergunta}</td>
                <td><input type="radio" name="${etapa}_${index}" value="A"></td>
                <td><input type="radio" name="${etapa}_${index}" value="B"></td>
                <td><input type="radio" name="${etapa}_${index}" value="C"></td>
                <td><input type="radio" name="${etapa}_${index}" value="D"></td>
            </tr>`;
        });
        html += `</table>`;
        container.innerHTML += html;
    }
}

function calcularModa() {
    let respostas = document.querySelectorAll("input[type='radio']:checked");
    let contagem = {"A": 0, "B": 0, "C": 0, "D": 0};
    
    respostas.forEach(resposta => {
        contagem[resposta.value]++;
    });
    
    let conceitoFinal = Object.keys(contagem).reduce((a, b) => contagem[a] >= contagem[b] ? a : b);
    document.getElementById("conceito-final").textContent = conceitoFinal;
    alert(`O conceito final da avaliação é: ${conceitoFinal}`);
    salvarAvaliacao(conceitoFinal);
}

function salvarAvaliacao(conceitoFinal) {
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    let novaAvaliacao = {
        grupo: document.getElementById("grupo").value,
        tema: document.getElementById("tema").value,
        estudantes: document.getElementById("estudantes").value,
        conceitoFinal: conceitoFinal,
        observacoes: document.getElementById("observacoes").value
    };
    avaliacoes.push(novaAvaliacao);
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
}

function salvarAvaliacaoManual() {
    let conceito = document.getElementById("conceito-final").textContent;
    if (!conceito) {
        alert("Calcule o conceito final antes de salvar a avaliação.");
        return;
    }
    salvarAvaliacao(conceito);
    alert("Avaliação salva com sucesso!");
}

function verAvaliacoes() {
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    let container = document.getElementById("avaliacoes-salvas");
    container.innerHTML = "<h3>Avaliações Salvas</h3>";
    if (avaliacoes.length === 0) {
        container.innerHTML += "<p>Nenhuma avaliação salva.</p>";
    } else {
        avaliacoes.forEach(avaliacao => {
            container.innerHTML += `<p><strong>Grupo:</strong> ${avaliacao.grupo} | <strong>Tema:</strong> ${avaliacao.tema} | <strong>Conceito Final:</strong> ${avaliacao.conceitoFinal} | <strong>Observações:</strong> ${avaliacao.observacoes}</p>`;
        });
    }
}

function limparAvaliacoes() {
    localStorage.removeItem("avaliacoes");
    document.getElementById("avaliacoes-salvas").innerHTML = "<p>Avaliações removidas.</p>";
}

window.onload = criarTabelas;