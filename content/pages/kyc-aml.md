---
title: 'KYC/AML'
---

No momento a Alita Quantum não solicita documentos para validar as transações, entretanto pode ocorrer situações em que será necessário fazer a verificação KYC/AML.

Aqui estão os casos em que a validação do usuário pode ser necessária:

- Quando não for possível fazer o reembolso no endereço de origem (se a troca foi realizada por meio de um provedor de liquidez) ou no endereço de reembolso;
- Quando houver mudança de endereço de pagamento;
- Quando houver uma alteração / exclusão do memo / etiqueta de destino / ID extra;
- Alguns casos de processamento de trocas sem especificar o memorando / etiqueta de destino / ID extra (se o memorando não foi especificado desde o início, o memorando estava incorreto, enquanto o valor da troca flutua em mais de 1%, o depósito é enviado mais de 20 minutos após a criação da transação, bem como se houver transações idênticas criadas em 30 minutos);
- se houver erros de digitação ou espaços no endereço ao trocar maior de 0.1 BTC.

Em todos esses casos, precisamos validar o usuário para que possamos ter certeza de que a pessoa que nos contata é quem criou a troca. Desta forma, podemos minimizar os riscos de roubo de fundos.

O tipo de validação depende do valor da troca.
Nossa opção de validação padrão é a validação de transação de pó (pedimos ao usuário que nos envie um pouco de pó do endereço inicial / de reembolso para o nosso endereço de depósito ou do endereço de pagamento para o interno).
Exceção: se uma moeda anônima (por exemplo, XMR, BEAM) estiver envolvida na troca, podemos enviar a transação de pó nós mesmos para o endereço indicado na troca, e o usuário terá que nomear o valor exato, enviar um hash e uma captura de tela para ilustrar completamente todas as informações (hash, quantidade, endereço, data.

Se o usuário se recusar a validar a si mesmo com uma transação de poeira ou não puder realizá-la, o fluxo será o seguinte:
- se o valor da troca for inferior a $100, pedimos ao usuário que siga o procedimento KYC. Exceções: os casos com alteração de endereço de payOut. Neste caso, KYC não é aplicável;
- se o valor da troca for de $100 a $500, ou o usuário se recusar a passar pelo KYC ao trocar menos de $100, solicitamos um vídeo da carteira. O vídeo deve mostrar claramente como o cliente entra em sua conta pessoal (sem mostrar a senha), como ele entra no histórico de saques, e também o valor da troca, o hash da transação, a data e os endereços devem estar visíveis.
- se o valor da troca for superior a $500, é necessário agendar uma videochamada.

Observe que a validação da transação em pó é a forma mais preferível.

Esperamos que as informações tenham sido úteis para você! Teremos o maior prazer em responder a todas as suas perguntas sobre o assunto.
