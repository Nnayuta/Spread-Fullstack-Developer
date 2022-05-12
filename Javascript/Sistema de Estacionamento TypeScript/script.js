(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const minutos = Math.floor(mil / 60000);
        const segundos = Math.floor((mil % 60000) / 1000);
        return `${minutos}m ${segundos}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                <button class='delete' data-placa="${veiculo.placa}"> X </button>
                </td>
            `;
            row.querySelector('.delete').addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            $("#patio").appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(v => v.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm('O Veiculo ' + nome + ' permaneceu por: ' + tempo + '\nDeseja encerrar?'))
                return;
            salvar(ler().filter(v => v.placa !== placa));
            render();
        }
        function render() {
            $("#patio").innerHTML = '';
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return {
            ler,
            adicionar,
            remover,
            salvar,
            render
        };
    }
    patio().render();
    (_a = $('#Cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const nome = $('#Nome').value;
        const placa = $('#Placa').value;
        if (!nome || !placa) {
            return alert('Os campos não podem estar vazios');
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
}());