const fs = require('fs')
const faker = require('faker')

const lines = 1000000
const filename = 'products.csv'
const stream = fs.createWriteStream(filename)

const createProduct = (i) => {
  const id = i
  const name = faker.commerce.productName()
  const brand = faker.commerce.department()
  const prodcut = faker.commerce.product()
  const material = faker.commerce.productMaterial()
  const adjective = faker.commerce.productAdjective()
  const imageMini = faker.image.image()
  const price = faker.commerce.price()
  const salesPrice = price * 0.8
  const onSale = faker.random.boolean()
  const rating = faker.random.number({ min: 1, max: 5, precision: 0.01 })
  const isFavorite = faker.random.boolean()

  return `${id},${name},${brand},${prodcut},${material},${adjective},${imageMini},${price},${salesPrice},${onSale},${rating},${isFavorite}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines
  function writing(){
    let canWrite = true
    do {
      i--
      let product = createProduct(i)
      //check if i === 0 so we would write and call `done`
      if(i === 0){
        // we are done so fire callback
        writeStream.write(product, encoding, done)
      }else{
        // we are not done so don't fire callback
        writeStream.write(product, encoding)
      }
      //else call write and continue looping
    } while(i > 0 && canWrite)
    if(i > 0 && !canWrite){
      //our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  writing()
}

//write our `header` line before we invoke the loop
stream.write(`id,name,brand,prodcut,material,adjective,imageMini,price,salesPrice,onSale,rating,isFavorite\n`, 'utf-8')
//invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end()
})
