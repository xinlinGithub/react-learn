const deleteNum = index => ({
  type: "DELETE_NUM",
  index: index
});

const randomNum = () => ({
  type: "RANDOM_NUM",
  value: Math.floor(Math.random() * 1000000)
});

export default {
    deleteNum,
    randomNum
}
