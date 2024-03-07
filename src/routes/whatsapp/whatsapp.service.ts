export const sendMessage = async (toNumber: string, message: string): Promise<void> => {
    console.log(`REGULAR WHATSAPP MESSAGE SENT!!! ${{ toNumber }}, ${{ message }}`);
};

export const sendInteractive = async (
    toNumber: string,
    message: string,
    selectionOptions: Record<string, string>[]
): Promise<void> => {
    console.log(`INTERACTIVE WHATSAPP MESSAGE SENT!!! ${{ toNumber }}, ${{ message }}, ${{ selectionOptions }}`);
};
