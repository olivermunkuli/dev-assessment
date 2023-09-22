export function convertToCSV(clients) {
    console.log("Client\n", clients);
    const header = ["ID", "Name", "Surname", "Email", "Gender", "Addresses"];
    const rows = clients.map((client) => [
        client.id,
        client.name,
        client.surname,
        client.email,
        client.gender,
        JSON.stringify(client.addresses)
    ]);

    const csvData = [header, ...rows].map((row) => row.join(',')).join('\n');
    return csvData;
}


export function downloadCSV(data, filename) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}