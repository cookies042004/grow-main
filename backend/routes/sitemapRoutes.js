const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const Property = require("../models/property");

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
    try {
        res.header("Content-Type", "application/xml");
        res.header("Content-Encoding", "gzip");
    
        const smStream = new SitemapStream({ hostname: "https://www.growinfinityrealtors.in" });
        const pipeline = smStream.pipe(createGzip());

        smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });

        const properties = await Property.find({}, "slug updatedAt");
    
        properties.forEach((property) => {
          smStream.write({
            url: `/project/${property.slug}`,
            lastmod: property.updatedAt,
            changefreq: "weekly",
            priority: 0.8,
          });
        });
    
        smStream.end();
        streamToPromise(pipeline).then(sm => res.send(sm));
      } catch (e) {
        console.error(e);
        res.status(500).end();
      }  
})

module.exports = router;