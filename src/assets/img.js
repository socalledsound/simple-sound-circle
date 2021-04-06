const importAll = require =>
  require.keys().reduce((acc, next, i) => {
    acc[i] = require(next);
    // console.log(acc)
    return acc;
  }, []);

  export const images0 = importAll(
    require.context("./img/0", false, /\.(png|jpe?g|svg)$/)
  );

  export const images1 = importAll(
    require.context("./img/1", false, /\.(png|jpe?g|svg)$/)
  );

  export const images2 = importAll(
    require.context("./img/2", false, /\.(png|jpe?g|svg)$/)
  );

  export const images3 = importAll(
    require.context("./img/2", false, /\.(png|jpe?g|svg)$/)
  );

  export const images4 = importAll(
    require.context("./img/2", false, /\.(png|jpe?g|svg)$/)
  );

  export const images5 = importAll(
    require.context("./img/2", false, /\.(png|jpe?g|svg)$/)
  );