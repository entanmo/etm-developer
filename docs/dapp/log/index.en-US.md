# Find Problem
<img src="/images/dapp/dapp06_en.jpg"  >

### Main Chain Log View
Directory:xxx/etm/logs/xxx.log

How to view the log? If there is a problem, you can check the log immediately.

	//Write the latest 10,000 rows of logs to debug.log because the log file may be large at this time
	tail -n 10000 xxx.log > debug.log
	//View questions according to your own dappID and other keywords
	vi debug.log
	//Here you need to have a certain ability to view bugs

### Side Chain Log View
xxx/etm/dapps/dappId/logs/xxx.log


	//Write the latest 10,000 rows of logs to debug.log
	tail -n 10000 xxx.log > debug.log
	//View questions according to your own dappID and other keywords
	vi debug.log
	//Here you need to have a certain ability to view bugs
