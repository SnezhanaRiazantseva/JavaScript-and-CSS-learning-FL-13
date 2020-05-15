const booksData = [
  {
    'bookName': 'The Glass Hotel',
    'bookAuthor': 'Emily St. John Mandel',
    'bookImg': 'https://images-na.ssl-images-amazon.com/images/I/81ZPFtlapCL._SL1500_.jpg',
    'bookPlot': `Vincent is a bartender at the Hotel Caiette, a five-star glass and cedar palace on an island in 
British Columbia. Jonathan Alkaitis works in finance and owns the hotel. When he passes Vincent his card with a 
tip, it's the beginning of their life together. That same day, Vincent's half-brother, Paul, scrawls a note on 
the windowed wall of the hotel: "Why don't you swallow broken glass." Leon Prevant, a shipping executive for a 
company called Neptune-Avramidis, sees the note from the hotel bar and is shaken to his core. Thirteen years later 
Vincent mysteriously disappears from the deck of a Neptune-Avramidis ship.`,
    'uid': ''
  }, 
  {
    'bookName': 'Recollections of My Non-Existence',
    'bookAuthor': 'Rebecca Solnit',
    'bookImg': 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2020/03/960w/Solnit.5e6a48b7a4382.jpg',
    'bookPlot': `In 1981, Rebecca Solnit rented a studio apartment in San Francisco that would be her home for the 
next twenty-five years. There, she began to come to terms with the epidemic of violence against women around her, 
the street harassment that unsettled her, and the authority figures that routinely disbelieved her. That violence 
weighed on her as she faced the task of having a voice in a society that preferred women to shut up or go away.`,
    'uid': ''
  }, 
  {
    'bookName': 'Insanely Simple',
    'bookAuthor': 'Ken Segall',
    'bookImg': 'https://basit.blog/wp-content/uploads/2016/10/Insanely-simple-kapak.jpg',
    'bookPlot': `To Steve Jobs, Simplicity was a religion. It was also a weapon. 
Simplicity isnt just a design principle at Appleits a value that permeates every level of the organization. The 
obsession with Simplicity is what separates Apple from other technology companies. Its what helped Apple recover 
from near death in 1997 to become the most valuable company on Earth in 2011.`,
    'uid': ''
  }
];
    
function addInitialStorage() {
  if (localStorage.getItem('allBooks')) {
    return;
  } else {
    localStorage.setItem('allBooks', JSON.stringify(booksData));
  }
}
addInitialStorage();