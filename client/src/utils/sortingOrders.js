const sortingData = (arr) => {
    return arr.sort((a, b) => {
      const typeOrder = { waiting: 1, delivered: 2, received: 3 };
      return typeOrder[a.status] - typeOrder[b.status];
    });
}
export default sortingData