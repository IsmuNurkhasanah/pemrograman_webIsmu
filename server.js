const WebSocket = require('ws');

const ws_s = new WebSocket.Server({ port: 3000 });
console.log('Websocket server berjalan di ws://localhost:3000');

ws_s.on('connection', (ws) => {
    console.log('Klien terhubung!');

    ws.send('Terhubung ke server WebSocket.');

    ws.on('message', (message) => {
        console.log(`Pesan diterima dari klien: ${message}`);

        // Kirim ke semua klien KECUALI pengirim
        ws_s.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log('Mengirim ke klien lain:', message.toString());
                client.send(`Dari klien lain: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log(' Klien terputus');
    });
});
