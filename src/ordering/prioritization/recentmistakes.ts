import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
  // 1. Массивыг эхлээд урвуу харуулна (Reverse)
  // Ингэснээр хамгийн сүүлд хариулсан 7, 6, 5... гэсэн дараалалтай болно.
  const reversedCards = cards.slice().reverse();

  // 2. Одоо эрэмбэлэлтээ хийнэ
  return reversedCards.sort((a, b) => {
    const resA = a.getResults();
    const resB = b.getResults();
    const lastA = resA[resA.length - 1];
    const lastB = resB[resB.length - 1];
    if (lastA === false && lastB !== false) return -1;
    if (lastA !== false && lastB === false) return 1;

    return 0; 
  });
}
  }
};

export { newRecentMistakesFirstSorter }
