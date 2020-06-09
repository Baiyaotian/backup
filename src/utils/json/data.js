// 备份历史
const backup = {
content: [
{
id: 153,
backupDetail: {
uuid: "7f000001-7257-14da-8172-57889f580000",
backupName: "backup",
backupGroup: 1,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
tenant: {
username: "icbc",
endpoint: {
address: "172.16.155.201:7480",
https: false,
storageType: 1,
displayName: "ceph"
},
accessKey: "I74IB7JXCQN67HUS2XZD",
quota: 200,
displayName: "icbc"
},
bucket: "bucket-1",
holdTime: 0,
holdType: 0,
// backupData: "{"include":["a.txt","b.txt","directory1","directory2"],"exclude":["directory1/a.txt","directory2/a.txt"],"baseDir":"/root/test"}",
mountPoint: "/mnt/s3fs",
cronExpression: "0 0/1 * * * ? ",
cronTriggerList: null
},
startTime: 1590631320000,
endTime: 1590631321000,
state: 32,
holdTime: 1000
},
{},
{},
{},
{}
],
pageable: {
sort: {
unsorted: true,
sorted: false,
empty: true
},
offset: 10,
pageNumber: 1,
pageSize: 10,
paged: true,
unpaged: false
},
last: true,
totalPages: 2,
totalElements: 15,
size: 10,
numberOfElements: 5,
first: false,
number: 1,
sort: {
unsorted: true,
sorted: false,
empty: true
},
empty: false
}
// 恢复历史
const recovery = {
content: [
{
id: 10,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
backupRecord: {
id: 143,
backupDetail: {
uuid: "7f000001-7257-14da-8172-57889f580000",
backupName: "backup",
backupGroup: 1,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
tenant: {
username: "icbc",
endpoint: {
address: "172.16.155.201:7480",
https: false,
storageType: 1,
displayName: "ceph"
},
accessKey: "I74IB7JXCQN67HUS2XZD",
quota: 200,
displayName: "icbc"
},
bucket: "bucket-1",
holdTime: 0,
holdType: 0,
// backupData: "{"include":["a.txt","b.txt","directory1","directory2"],"exclude":["directory1/a.txt","directory2/a.txt"],"baseDir":"/root/test"}",
mountPoint: "/mnt/s3fs",
cronExpression: "0 0/1 * * * ? ",
cronTriggerList: null
},
startTime: 1590629160000,
endTime: 1590629160000,
state: 32,
holdTime: 0
},
startTime: 1590629824000,
endTime: 1590629824000,
state: 32,
// data: "{"data": "/root/recovery", "mountPoint": "/mnt/s3fs"}"
},
{
id: 11,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
backupRecord: {
id: 143,
backupDetail: {
uuid: "7f000001-7257-14da-8172-57889f580000",
backupName: "backup",
backupGroup: 1,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
tenant: {
username: "icbc",
endpoint: {
address: "172.16.155.201:7480",
https: false,
storageType: 1,
displayName: "ceph"
},
accessKey: "I74IB7JXCQN67HUS2XZD",
quota: 200,
displayName: "icbc"
},
bucket: "bucket-1",
holdTime: 0,
holdType: 0,
// backupData: "{"include":["a.txt","b.txt","directory1","directory2"],"exclude":["directory1/a.txt","directory2/a.txt"],"baseDir":"/root/test"}",
mountPoint: "/mnt/s3fs",
cronExpression: "0 0/1 * * * ? ",
cronTriggerList: null
},
startTime: 1590629160000,
endTime: 1590629160000,
state: 32,
holdTime: 0
},
startTime: 1590629990000,
endTime: 1590629991000,
state: 32,
// data: "{"data": "/root/recovery", "mountPoint": "/mnt/s3fs"}"
},
{
id: 12,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
backupRecord: {
id: 143,
backupDetail: {
uuid: "7f000001-7257-14da-8172-57889f580000",
backupName: "backup",
backupGroup: 1,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
tenant: {
username: "icbc",
endpoint: {
address: "172.16.155.201:7480",
https: false,
storageType: 1,
displayName: "ceph"
},
accessKey: "I74IB7JXCQN67HUS2XZD",
quota: 200,
displayName: "icbc"
},
bucket: "bucket-1",
holdTime: 0,
holdType: 0,
// backupData: "{"include":["a.txt","b.txt","directory1","directory2"],"exclude":["directory1/a.txt","directory2/a.txt"],"baseDir":"/root/test"}",
mountPoint: "/mnt/s3fs",
cronExpression: "0 0/1 * * * ? ",
cronTriggerList: null
},
startTime: 1590629160000,
endTime: 1590629160000,
state: 32,
holdTime: 0
},
startTime: 1590630121000,
endTime: 1590630121000,
state: 32,
// data: "{"data": "/root/recovery", "mountPoint": "/mnt/s3fs"}"
},
{
id: 13,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
backupRecord: {
id: 143,
backupDetail: {
uuid: "7f000001-7257-14da-8172-57889f580000",
backupName: "backup",
backupGroup: 1,
client: {
ipv4: 2886769509,
ipv6: null,
username: "root",
hostname: "主机1"
},
tenant: {
username: "icbc",
endpoint: {
address: "172.16.155.201:7480",
https: false,
storageType: 1,
displayName: "ceph"
},
accessKey: "I74IB7JXCQN67HUS2XZD",
quota: 200,
displayName: "icbc"
},
bucket: "bucket-1",
holdTime: 0,
holdType: 0,
// backupData: "{"include":["a.txt","b.txt","directory1","directory2"],"exclude":["directory1/a.txt","directory2/a.txt"],"baseDir":"/root/test"}",
mountPoint: "/mnt/s3fs",
cronExpression: "0 0/1 * * * ? ",
cronTriggerList: null
},
startTime: 1590629160000,
endTime: 1590629160000,
state: 32,
holdTime: 0
},
startTime: 1590630989000,
endTime: 1590630990000,
state: 32,
// data: "{"data": "/root/recovery/", "mountPoint": "/mnt/s3fs"}"
}
],
pageable: {
sort: {
sorted: false,
unsorted: true,
empty: true
},
pageNumber: 0,
pageSize: 10,
offset: 0,
paged: true,
unpaged: false
},
totalPages: 1,
last: true,
totalElements: 4,
number: 0,
sort: {
sorted: false,
unsorted: true,
empty: true
},
size: 10,
first: true,
numberOfElements: 4,
empty: false
}
// 备份计划
 const backplan = {
	content: [
		{
		uuid: "c0a82b59-725f-1119-8172-5f46634d0000",
		backupName: "backup",
		backupGroup: 1,
		client: {
			ipv4: 2886769509,
			ipv6: null,
			username: "root",
			hostname: "主机1"
		},
		tenant: {
			username: "icbc",
			endpoint: {
			address: "172.16.155.201:7480",
			https: false,
			storageType: 1,
			displayName: "ceph"
			},
		accessKey: "I74IB7JXCQN67HUS2XZD",
		quota: 200,
		displayName: "icbc"
		},
		bucket: "bucket-1",
		holdTime: 0,
		holdType: 0,
		// backupData: "{"include":["a.txt","b.txt","directory1","directory2"],"exclude":["directory1/a.txt","directory2/a.txt"],"base_dir":"/root/test"}",
		mountPoint: "/mnt/s3fs",
		cronExpression: "0 0/1 * * * ? ",
		cronTriggerList: [
			{
			cronExpression: "0 0/1 * * * ? ",
			startTime: 1589872670000,
			endTime: null,
			prevFireTime: 1590736380000,
			nextFireTime: 1590736440000,
			state: 16
			}
		]
		}
	],
	pageable: {
	sort: {
	sorted: false,
	unsorted: true,
	empty: true
	},
	pageNumber: 0,
	pageSize: 10,
	offset: 0,
	paged: true,
	unpaged: false
	},
	totalPages: 1,
	last: true,
	totalElements: 1,
	number: 0,
	sort: {
	sorted: false,
	unsorted: true,
	empty: true
	},
	size: 10,
	first: true,
	numberOfElements: 1,
	empty: false
}
const usage = [
	{
		username: "icbc",
		endpoint: "172.16.155.201:7480",
		quota: 200,
		displayName: "icbc",
		usages: {
			Entries: [ ],
			Summary: [
				231,
				4096,
				183
			],
			CapacityUsed: [
				{
					Buckets: [
						{
							Bucket: "bucket-1",
							Bytes: 231,
							Bytes_Rounded: 4096
					},
					{
						Bucket: "bucket-2",
						Bytes: 0,
						Bytes_Rounded: 0
					},
					{
						Bucket: "bucket_1",
						Bytes: 0,
						Bytes_Rounded: 0
						}
					]	
				}
			]
		}
	},
	{
		username: "s3user",
		endpoint: "172.16.155.201:7480",
		quota: 100,
		displayName: "s3user",
		usages: {
			Entries: [ ],
			Summary: [
				0,
				0,
				0
			],
			CapacityUsed: [
				{
				Buckets: [ ]
				}
			]
		}
	}
]
export const data =  {
    backup,
    recovery,
    backplan,
    usage: usage
}