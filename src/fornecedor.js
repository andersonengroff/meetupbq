
const popularFornecedores = () => {
  const fornecedores = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    const fornecedor = {
      id: `${i}`,
      nome: `Fornecedor ${i}`,
      email: `fornecedor${i}@gmail.com`,
      endereco: {
        logradouro: `Rua ${i}`,
        numero: `${i}`,
        bairro: 'teste',
        cidade: 'Curitiba',
      },
    }

    fornecedores.push(fornecedor)
  }
  return fornecedores
}

module.exports = { popularFornecedores }
