const findOffers = (typeOfPoint) => {
  const foundOffersType = offersByType.find((item) => item.type === typeOfPoint);
  return foundOffersType ? foundOffersType.offers : [];
};
const findDestination = (city) => destinations.find((destination) => destination.name === city);

const findCheckedOffers = (typeOfPoint, checkedOffers) => {
  const foundOffersType = offersByType.find((item) => item.type === typeOfPoint).offers;
  return foundOffersType.filter((offer) => checkedOffers.includes(offer.id));
};

export { findOffers, findDestination, findCheckedOffers };

