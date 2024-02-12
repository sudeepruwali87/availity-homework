const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const enrolls = {};

function readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const company = row['Insurance Company'];
                if (!enrolls[company]) {
                    enrolls[company] = [];
                }
                enrolls[company].push(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            })
            .on('error', reject);
    });
}

function processEnrolls() {
    Object.keys(enrolls).forEach(company => {
        // Remove duplicates and keep the highest version
        const unique = {};
        enrolls[company].forEach(enrollee => {
            const userId = enrollee['User Id'];
            if (!unique[userId] || parseInt(enrollee['Version'], 10) > parseInt(unique[userId]['Version'], 10)) {
                unique[userId] = enrollee;
            }
        });
        // Sort by last and first name
        enrolls[company] = Object.values(unique).sort((a, b) => {
            if (a['Last Name'] === b['Last Name']) {
                return a['First Name'].localeCompare(b['First Name']);
            }
            return a['Last Name'].localeCompare(b['Last Name']);
        });
    });
}

function writeCSV(company) {
    const csvWriter = createCsvWriter({
        path: `./${company.replace(/\s+/g, '_').toLowerCase()}_enrols.csv`,
        header: [
            { id: 'User Id', title: 'User Id' },
            { id: 'First Name', title: 'First Name' },
            { id: 'Last Name', title: 'Last Name' },
            { id: 'Version', title: 'Version' },
            { id: 'Insurance Company', title: 'Insurance Company' },
        ]
    });

    return csvWriter.writeRecords(enrolls[company])
        .then(() => console.log(`The CSV file for ${company} was written successfully`));
}

async function main() {
    await readCSVFile('enrollment_file.csv');
    processEnrolls();
    const writePromises = Object.keys(enrolls).map(writeCSV);
    await Promise.all(writePromises);
}

main().catch(console.error);
