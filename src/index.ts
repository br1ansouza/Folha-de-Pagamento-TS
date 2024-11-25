import * as readlineSync from 'readline-sync';

interface Funcionario {
    id: number;
    nome: string;
    cargo: string;
    taxaHoraria: number;
    horasTrabalhadas: number[];
}

const funcionarios: Funcionario[] = [];

function adicionarFuncionario(): void {
    const id = funcionarios.length + 1; // gera um ID único
    const nome = readlineSync.question('Digite o nome do funcionario: ');
    const cargo = readlineSync.question('Digite o cargo do funcionário: ');
    const taxaHoraria = parseFloat(readlineSync.question('Digite a taxa horária do funcionario: '));

    const novoFuncionario: Funcionario = {
        id,
        nome,
        cargo,
        taxaHoraria,
        horasTrabalhadas: [],
    };

    funcionarios.push(novoFuncionario);
    console.log(`Funcionario ${nome} adicionado com sucesso!`);
}

function registrarHoras(): void {
    const id = parseInt(readlineSync.question('Digite o ID do funcionario: '));
    const funcionario = funcionarios.find(func => func.id === id);

    if (!funcionario) {
        console.error('Funcionario nao encontrado!');
        return;
    }

    const horas = parseFloat(readlineSync.question('Digite as horas trabalhadas: '));
    funcionario.horasTrabalhadas.push(horas);
    console.log(`Horas registradas para ${funcionario.nome}: ${horas} horas.`);
}

function calcularSalarioMensal(id: number): number {
    const funcionario = funcionarios.find(func => func.id === id);
    if (!funcionario) return 0;

    const totalHoras = funcionario.horasTrabalhadas.reduce((soma, horas) => soma + horas, 0);
    return totalHoras * funcionario.taxaHoraria;
}

function calcularInss(salarioBruto: number): number {
    const tetoInss = 908.85;
    const aliquota = 0.11;
    return Math.min(salarioBruto * aliquota, tetoInss);
}

function gerarRelatorioPagamento(): void {
    console.log('Relatorio de Pagamento:');
    console.log('========================================');

    funcionarios.forEach(funcionario => {
        const totalHoras = funcionario.horasTrabalhadas.reduce((soma, horas) => soma + horas, 0);
        const salarioBruto = calcularSalarioMensal(funcionario.id);
        const valorInss = calcularInss(salarioBruto);
        const salarioLiquido = salarioBruto - valorInss;

        console.log(`Nome: ${funcionario.nome}`);
        console.log(`Cargo: ${funcionario.cargo}`);
        console.log(`Total de Horas: ${totalHoras}`);
        console.log(`Valor do INSS: R$ ${valorInss.toFixed(2)}`);
        console.log(`Salario Bruto: R$ ${salarioBruto.toFixed(2)}`);
        console.log(`Salario Liquido: R$ ${salarioLiquido.toFixed(2)}`);
        console.log('----------------------------------------');
    });
}

function gerenciarFolhaPagamento(): void {
    let opcao = 0;

    do {
        console.log('\nMenu de Gerenciamento de Folha de Pagamento');
        console.log('1. Adicionar funcionario');
        console.log('2. Registrar horas trabalhadas');
        console.log('3. Exibir relatorio de pagamento');
        console.log('4. Sair');
        opcao = parseInt(readlineSync.question('Escolha uma opcao: '));

        switch (opcao) {
            case 1:
                adicionarFuncionario();
                break;
            case 2:
                registrarHoras();
                break;
            case 3:
                gerarRelatorioPagamento();
                break;
            case 4:
                console.log('Saindo do sistema...');
                break;
            default:
                console.log('Opção invalida. Tente novamente.');
        }
    } while (opcao !== 4);
}

// Inicia o sistema
gerenciarFolhaPagamento();
