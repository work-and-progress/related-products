import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../StarRating/StarRating';
import style from './styles.css';

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    const {
      id,
      image,
      imageMini,
      isFavorite,
      name,
      onSale,
      price,
      rating,
      related_products,
      salePrice,
      brand,
    } = props.product;

    this.state = {
      id,
      image,
      imageMini,
      isFavorite,
      name,
      onSale,
      price,
      rating,
      related_products,
      salePrice,
      brand,
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite() {
    const { updateProduct } = this.props;
    const updatedProduct = this.state;
    updatedProduct.isFavorite = !updatedProduct.isFavorite;
    updateProduct(updatedProduct);
  }

  render() {
    const {
      isFavorite, brand, name, imageMini, rating, onSale, price, salePrice,
    } = this.state;

    let prices;

    if (onSale) {
      prices = (
        <>
          <div className={style.oldPrice}>
            $
            {price}
          </div>
          <div className={style.price}>
            $
            {salePrice}
          </div>
        </>
      );
    } else {
      prices = (
        <div className={style.price}>
          $
          {price}
        </div>
      );
    }

    return (
      <div className={style.container}>
        <div className={style.stage}>
          <button type="button" className={isFavorite ? `${style.heart} ${style.is_active}` : style.heart} onClick={this.toggleFavorite}>{ }</button>
        </div>
        <img className={style.image} src={imageMini} alt="thumbnail" />
        <div className={style.brand}>{brand}</div>
        <div className={style.name}>{name}</div>
        <StarRating rating={rating} />
        <div className={style.prices}>
          {prices}
        </div>
      </div>
    );
  }
}

ProductCard.defaultProps = {
  updateProduct: null,
  product: {},
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    brand: PropTypes.string,
    name: PropTypes.string,
    product_features: PropTypes.shape(
      {
        header: PropTypes.string,
        features: PropTypes.arrayOf(
          PropTypes.shape({
            heading: PropTypes.string,
            description: PropTypes.string,
            posX: PropTypes.number,
            posY: PropTypes.number,
          }),
        ),
      },
    ),
    related_products: PropTypes.arrayOf(PropTypes.number),
    image: PropTypes.string,
    imageMini: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    onSale: PropTypes.bool,
    rating: PropTypes.number,
    isFavorite: PropTypes.bool,
  }),
  updateProduct: PropTypes.func,
};
