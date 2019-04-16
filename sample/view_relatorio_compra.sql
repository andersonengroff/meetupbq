

select f.id, 
       f.nome as fornecedor, 
       f.email,
       f.endereco,
       e.id as idProduto,
       e.nome as nomeProduto,
       e.preco_compra as precoCompra,
       e.moeda,
       e.estoque,
       p.qtdePedido,
       if (p.qtdePedido > e.estoque, p.qtdePedido - e.estoque, 0) comprar,
       c.valor valorDolar,
       round(if (p.qtdePedido > e.estoque, (p.qtdePedido - e.estoque) * preco_compra * c.valor, 0),2) precoTotal
from `your-project_id.meetup.Fornecedor` f
join `your-project_id.meetup.Estoque` e on e.cod_fornecedor = cast(f.id as int64)
join (
        select idProduto, 
               sum(quantidade) as qtdePedido
        from `your-project_id.meetup.Pedido`
        group by 1
     ) p on p.idProduto = e.id
cross join (select valor from `your-project_id.meetup.view_Cotacao` where data = current_date()) c
