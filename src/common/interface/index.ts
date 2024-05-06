import { EnableStatus, NotificationType, Status } from "../enums/all.enum";

export interface NotificationBody {
    resource_id: number,
    type: NotificationType,
    body: string
}

export interface IPieData {
    type: string
    value: number
}

export interface IBarData {
    type: string
    value: number,
    month:string
}

export interface INotificationUser {
    id: number
    notificationStatus: EnableStatus
    userType: string
    status: Status
}