export const getUsage = () =>{
	return [
		{
			username: 'admin',
			endpoint: '84.10.234.51:7480',
			quota: 10240,
			displayName: 'admin_user',
			usages: {
				Entries: [],
				Summary: [42212290750, 42501533696, 3001956],
				CapacityUsed: [
					{
						Buckets: [
							{ Bucket: 'bucket1', Bytes: 262, Bytes_Rounded: 4096 },
							{ Bucket: 'kkbackup', Bytes: 30212290408, Bytes_Rounded: 30213464064 },
							{ Bucket: 'kkbackup2', Bytes: 80, Bytes_Rounded: 65536 },
							{ Bucket: 'test1', Bytes: 2000000000, Bytes_Rounded: 2048000000 },
							{ Bucket: 'test2', Bytes: 2000000000, Bytes_Rounded: 2048000000 },
							{ Bucket: 'test3', Bytes: 2000000000, Bytes_Rounded: 2048000000 },
							{ Bucket: 'test4', Bytes: 2000000000, Bytes_Rounded: 2048000000 },
							{ Bucket: 'test5', Bytes: 2000000000, Bytes_Rounded: 2048000000 },
							{ Bucket: 'test6', Bytes: 2000000000, Bytes_Rounded: 2048000000 },
						]
					}
				]
			}
		}
	]
}