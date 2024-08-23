import xml2js from "xml2js";
import axios from "axios";
const parserXML = new xml2js.Parser({ attrkey: "ATTR" });

const productFeed = process.env.PRODUCT_FEED;

const getXmlData = async (url) => {
  return new Promise(async (resolve, reject) => {
    const xml = await axios
      .get(url, {
        timeout: 0,
        responseType: "text",
      })
      .then((res) => res.data)
      .catch((error) => {
        reject(`${error.name} ------- ${error.message}`);
      });
    if (!xml) {
      return reject("Brak Danych");
    }
    resolve(xml);
  });
};

const processXmlData = async (data) => {
  return new Promise((resolve, reject) => {
    parserXML.parseString(data, async (error, result) => {
      const parsedData = result.Products.Product;
      const products = parsedData.map((product) => {
        return {
          active: product.Active[0] === "1",
          id: product.Id[0],
          activeVariant: product.ActiveVariant[0] === "1",
          variantId: product.VariantId[0],
          sku: product.Sku[0],
          ean: product.Ean[0],
          name: product.Name[0],
          variantName:
            product.VariantName[0] === "---" ? "" : product.VariantName[0],
        };
      });
      if (error !== null) {
        reject("Błąd");
      }
      resolve(products);
    });
  });
};

export const getProducts = async () => {
  return await getXmlData(productFeed)
    .then((res) =>
      processXmlData(res)
        .then((data) => data)
        .catch((error) => error)
    )
    .catch((error) => error);
};
