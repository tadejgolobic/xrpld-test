import { Payment, xrpToDrops } from 'xrpl';
import { XrplIntegrationTestContext, serverUrl, setupClient } from '@transia/hooks-toolkit/dist/npm/src/libs/xrpl-helpers';

async function test() {
    const testContext = (await setupClient(
		serverUrl
	)) as XrplIntegrationTestContext

	const bobWallet = testContext.bob

	setTimeout(async () => {
		console.log('DOING');

		const builtTx: Payment = {
			TransactionType: 'Payment',
			Account: bobWallet.classicAddress,
			Destination: bobWallet.classicAddress,
			Amount: xrpToDrops(2),
		}

		await testContext.client.submit(builtTx, { autofill: true, wallet: bobWallet })
		console.log('TRANSACTION SUBMITTED');
		setTimeout(() => {
			testContext.client.request({ command: 'ledger_accept' })
		}, 2000)
	}, 5000)
}

test().then(console.log).catch(console.error)