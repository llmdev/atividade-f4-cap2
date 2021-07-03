const content = `
<html><head><title>Gulliver Traveller - Roteiros</title></head><body><b>->1 - Roteiros para *São Paulo*</b><br>A Terra da Garoa!<br>Fundada em 25 de janeiro de 1554 a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro financeiro do Brasil e aqui vão 3 dicas de roteiros obrigatórios para aqueles que passam pela capital paulista<br>#Roteiro A | Região: Avenida Paulista<br>MASP; Parque Trianon; Rua Augusta<br>#Roteiro B | Região: Centro<br>Catedral da Sé; Pátio do Colégio; Rua Augusta<br>#Roteiro C | Região: Vila Madalena<br>Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila<br> <b>->2 - Roteiros para *Las Vegas*</b><br>Viva Las Vegas!<br>       A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905 e é considerada uma cidade, oficialmente, desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos jogos de azar!<br>#Roteiro A | Região: Las Vegas Boulevard South<br>Fonte do Bellagio; Principais Cassinos; Madame Tussauds<br>#Roteiro B | Região: Downtown<br>; Fremont; Las Vegas Art Museum; Museu nacional do Crime Organizado; <br>#Roteiro C | Região: Las Vegas Boulevard North<br>Outlet Premium North; Stratosphere; Apple Fashion Show<br><b>->3 - Roteiros para *Moscou*</b><br>Privet!<br>A capital Russa fica situada às margens do Rio Moscou e apesar de ser a cidade mais cosmopolita da Rússia, conta com grande resguardo de sua história soviética<br>#Roteiro A | Região: Praça Vermelha<br>Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin<br>#Roteiro B | Região: Centro<br>Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou<br>#Roteiro C | Região: Obras pela cidade<br>Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station  <br>
</body>
</html>
`;

function searchWords(conteudo) {
  const roteiros = conteudo.split('Roteiros').filter( item => item.startsWith(" para"));
  const regexCidade = /\*(.*?)\*/ig;
  let pontosTuristicosSPCentro = [];
  let pontosTuristicosLasVegas = [];

  return roteiros.map(roteiro => {
    if (roteiro.startsWith(' para')) {
      let cidade = roteiro.match(regexCidade)[0].replaceAll('*', '');
      let roteiroA = roteiro.substring(roteiro.indexOf('#Roteiro A | Região:') + '#Roteiro A | Região:'.length, roteiro.indexOf('#Roteiro B')).substring(roteiro.indexOf('<br>'))
      let totalLocaisRoteiroA = roteiroA.split(';').length
      
      let result = {
        cidade,
        roteiroA,
        totalLocaisRoteiroA
      }

      if (cidade === 'São Paulo') {
        let roteiroCentro = roteiro.substring(roteiro.indexOf('Região: Centro'), roteiro.indexOf('#Roteiro C'))
        pontosTuristicosSPCentro = roteiroCentro.substring(roteiroCentro.indexOf('<br>')).replaceAll('<br>', '').split(';')
        result.pontosTuristicosSPCentro = pontosTuristicosSPCentro;
      }

      if (cidade === 'Las Vegas') {
        let roteiroDownTown = roteiro.substring(roteiro.indexOf('Região: Downtown<br>;'), roteiro.indexOf('#Roteiro C'))
        pontosTuristicosLasVegas = roteiroDownTown.substring(roteiroDownTown.indexOf('<br>')).replaceAll('<br>', '').split(';').filter( item => item.length > 1);

        result.pontosTuristicosLasVegas = pontosTuristicosLasVegas;
      }
      
      return result;
    }
  });
  
}


const app = document.querySelector('#app');
app.innerHTML = searchWords(content).map( item => `
  Cidade: ${item.cidade}</br>
  Roteiros A: ${item.roteiroA.replaceAll('<br>', '')}<br>
  Quantidade Locais Roteiro A: ${item.totalLocaisRoteiroA}
  ${item.cidade === 'São Paulo' ? '<br>Pontos Turisticos centro:' + item.pontosTuristicosSPCentro : ''}
  ${item.cidade === 'Las Vegas' ? '<br>Pontos Turisticos Downtown :' + item.pontosTuristicosLasVegas : ''}
`).join('<br><br>')