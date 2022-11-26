const multer = require('multer');
const path = require('path');
const crypto = require('crypto')

const FILE_DESTINATION = path.resolve(__dirname, '..', '..', 'temp', 'uploads')

module.exports = {
    dest: path.resolve(FILE_DESTINATION),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, FILE_DESTINATION)
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                callback(null, filename);
            });
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024 // limite em bytes.
    },
    fileFilter: (req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Invalid file type.  "))
        }
    }
}