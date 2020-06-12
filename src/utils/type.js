export const POINT_TYPE = {
    0x01: 'Ceph',
    0x02: 'OSB'
}
// 备份状态
export const BACKUP_STATE = {
    0x10: '运行中',
    0x00: '已结束',
    0x01: '等待中',
    0x02: '暂停中',
    0x03: 'Blocked',
    0x04: 'Pause_Blocked',
    0x40: '错误',
    0x70: 'Unknown'
}

export const BACKUP_STATE_ICON = {
    0x10: 'iconfont icon-zanting',
    0x00: 'iconfont icon-zanting',
    0x01: 'iconfont icon-zanting',
    0x02: 'iconfont icon-play'
}
// 备份状态颜色
export const BACKUP_STATE_COLOR = {
    0x10: 'success',
    0x00: 'default',
    0x01: 'primary',
    0x02: 'warning',
    0x03: 'warning',
    0x04: 'warning',
    0x40: 'danger',
    0x70: 'primary'
}
// 备份类型
export const BACKUP_GROUP_TYPE = {
    0x01: '文件',
    0x02: 'mysql 全量',
    0x03: 'mysql 增量',
    0x05: 'oracle 全量',
    0x06: 'oracle 增量',
}
// 记录状态
export const RECORD_STATE = {
    0x01: '等待中',
    0x02: '中断',
    0x10: '运行中',
    0x20: '完成',
    0x40: '失败',
    0x00: '已删除'
}
export const RECORD_STATE_COLOR = {
    0x01: '',
    0x02: 'warning',
    0x10: 'primary',
    0x20: 'success',
    0x40: 'danger',
    0x00: 'info'
}
export const EVENT_TYPE = {
    0X00: 'info',
    0x30: 'warning',
    0x20: 'success',
    0x40: 'danger'
}