const { StatusCodes } = require('http-status-codes');
const Data = require('../models/dashboard');
const dashboard = async (req, res) => {
    try {
        const data = await Data.find();
        //console.log(data);
        return res.status(StatusCodes.OK).json({
            succcess: true,
            message: 'API is live',
            length: data.length,
            data: data,
            error: {},
            date: {}
        })

    } catch (error) {
        console.error('Error:', err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
    }
}

const filterData = async (req, res) => {
    console.log(req.body);
    try {
        const {
            topic,
            end_year,
            country,
            impact,
            insight,
            intensity,
            likelihood,
            pestle,
            region,
            relevance,
            sector,
            source,
            start_year
        } = req.body;

        console.log(req.body, " : req.body");

        const query = {};

        function addToQuery(key, value) {
            if (value !== "") {
                if (value === 'datamissing') {
                    query[key] = "";
                } else {
                    if (key === 'intensity') {
                        query[key] = Number(value);
                    } else if (key === 'end_year') {
                        query[key] = Number(value);
                    } else if (key === 'start_year') {
                        query[key] = Number(value);
                    } else if (key === 'impact') {
                        query[key] = Number(value);
                    } else if (key === 'relevance') {
                        query[key] = Number(value);
                    } else if (key === 'likelihood') {
                        query[key] = Number(likelihood);
                    } else {
                        query[key] = value;
                    }
                }
            } else {
                delete query[key]
            }
        }

        topic && addToQuery('topic', topic);
        end_year && addToQuery('end_year', end_year);
        country && addToQuery('country', country);
        impact && addToQuery('impact', impact);
        insight && addToQuery('insight', insight);
        intensity && addToQuery('intensity', intensity);
        likelihood && addToQuery('likelihood', likelihood);
        pestle && addToQuery('pestle', pestle);
        region && addToQuery('region', region);
        relevance && addToQuery('relevance', relevance);
        sector && addToQuery('sector', sector);
        source && addToQuery('source', source);
        start_year && addToQuery('start_year', start_year);

        console.log(query, " ; query");

        // Perform the find operation with the constructed query
        const filteredData = await Data.find(query);
        return res.status(StatusCodes.OK).json({
            succcess: true,
            message: 'API is live',
            length: filteredData.length,
            data: filteredData,
            error: {},
            date: {}
        })
    } catch (err) {
        console.error('Error:', err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
    }
}

const aggregatedOptionList = async (req, res) => {
    try {
        let aggregatedOptionList = {};
        let uniqueTopics = [];
        // Aggregation pipeline to construct Uniques Option list for the Bulk Object Data
        Data.aggregate([
            {
                $group: {
                    _id: null,
                    uniqueTopics: { $addToSet: "$topic" },
                    uniqueEnd_year: { $addToSet: "$end_year" },
                    uniqueIntensity: { $addToSet: "$intensity" },
                    uniqueSector: { $addToSet: "$sector" },
                    uniqueInsight: { $addToSet: "$insight" },
                    uniqueRegion: { $addToSet: "$region" },
                    uniqueStart_year: { $addToSet: "$start_year" },
                    uniqueImpact: { $addToSet: "$impact" },
                    uniqueCountry: { $addToSet: "$country" },
                    uniqueRelevance: { $addToSet: "$relevance" },
                    uniquePestle: { $addToSet: "$pestle" },
                    uniqueSource: { $addToSet: "$source" },
                    uniqueLikelihood: { $addToSet: "$likelihood" }
                }
            }
        ]).exec()
            .then(result => {
                uniqueTopics = result[0]?.uniqueTopics?.map(option => option === "" ? "datamissing" : option);
                uniqueEnd_year = result[0]?.uniqueEnd_year?.map(option => option === "" ? "datamissing" : option);
                uniqueCountry = result[0]?.uniqueCountry?.map(option => option === "" ? "datamissing" : option);
                uniqueImpact = result[0]?.uniqueImpact?.map(option => option === "" ? "datamissing" : option);
                uniqueInsight = result[0]?.uniqueInsight?.map(option => option === "" ? "datamissing" : option);
                uniqueIntensity = result[0]?.uniqueIntensity?.map(option => option === "" ? "datamissing" : option);
                uniqueLikelihood = result[0]?.uniqueLikelihood?.map(option => option === "" ? "datamissing" : option);
                uniquePestle = result[0]?.uniquePestle?.map(option => option === "" ? "datamissing" : option);
                uniqueRegion = result[0]?.uniqueRegion?.map(option => option === "" ? "datamissing" : option);
                uniqueRelevance = result[0]?.uniqueRelevance?.map(option => option === "" ? "datamissing" : option);
                uniqueSector = result[0]?.uniqueSector?.map(option => option === "" ? "datamissing" : option);
                uniqueSource = result[0]?.uniqueSource?.map(option => option === "" ? "datamissing" : option);
                uniqueStart_year = result[0]?.uniqueStart_year?.map(option => option === "" ? "datamissing" : option);

                // we can use uniqueOptionList on our application as needed.
                aggregatedOptionList.topic = uniqueTopics;
                aggregatedOptionList.end_year = uniqueEnd_year;
                aggregatedOptionList.country = uniqueCountry;
                aggregatedOptionList.impact = uniqueImpact;
                aggregatedOptionList.insight = uniqueInsight;
                aggregatedOptionList.intensity = uniqueIntensity;
                aggregatedOptionList.likelihood = uniqueLikelihood;
                aggregatedOptionList.pestle = uniquePestle;
                aggregatedOptionList.region = uniqueRegion;
                aggregatedOptionList.relevance = uniqueRelevance;
                aggregatedOptionList.sector = uniqueSector;
                aggregatedOptionList.source = uniqueSource;
                aggregatedOptionList.start_year = uniqueStart_year;

                return res.status(StatusCodes.OK).json({
                    succcess: true,
                    message: 'API is live',
                    data: aggregatedOptionList,
                    uniqueTopics: uniqueTopics,
                    error: { message: "No error" },
                    date: {}
                })
            })
            .catch(err => {
                console.error('Error during aggregation:', err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    succcess: false,
                    message: 'API is live',
                    data: aggregatedOptionList,
                    uniqueTopics: uniqueTopics,
                    error: err.message,
                    date: {}
                })
            });

    } catch (err) {
        console.error('Error:', err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
    }
}

module.exports = {
    dashboard,
    filterData,
    aggregatedOptionList
}