package cn.beepower.eig

/**
 * Created by Guangyu on 2015/7/21
 *
 *
 *  Q1: beeId/moduleId/TopicName
 *    moduleId 是否应该为 appId？ 是一个 编译时决定，还是运行时决定的问题。
 *      beeId/appId/moduleId/TopicName采用：
 *
 *   A2:  还是采用 $terminal/moduleId/topicName
 *       terminal 表示的是 运行时信息； 后面表示编译时信息，都以接收为准。
 *
 *   规则：$terminal 是运行时信息，以接收方为准；
 *        moduleId 是编译时信息，因为不知谁会接收，因此，需要以内容产生方为准.
 *
 *    Q2: beeID号. 这是能决定路由的.
 *     跨越Mqtt时，可以自动加上 $beeId, 表示路由。
 *
 *     外部要调用插座，则： $beeId/$terminal/moduleId/topicName?
 *      到底应该是三个，还是四个。 如果自动加上或去掉beeId（表示gateway），是否可以？
 *
 *      terminal 变换？ 通过mqttsn 可以进行. 更好的是，在开始通讯后自动进行变换？
 *
 *      如果通过terminal 唯一标识则更好. 或者：
 *       terminal 表示为 beeId/appName， 如果是同一名字，则可以选取命名规则.
 *
 *      标准就是四个？ beeId/appId
 *        但是在下方发给上面时可以适当简化？
 *
 *  Q3:  terminalUpdate, 可以看作是虚函数，适用于所有的terminal。 不同的terminal，根据message做不同的解释。
 *
 */

val Tag: String = "fes"

object Topics {

    val EIG_IN = "EigIn"
    val EIG_OUT = "EigOut"

    // --------------------- from gateway to terminal -------------------
    // to terminal: fes/M/sck-10-xxcafdadfadfafsdff/9010010003
    fun control(terminal: String): String = "C/$terminal"
    val busConnector_ = "node/busConnector_"
    val busConnector = "node/busConnector"

    // ----------------- 以上信息只在网关本地MQTT服务器中订阅和发布 ---------

    // 统一了输入输出格式 格式为: EigIn(EigOut)/功能码/beeId
    // --------------------- from users to gateway -------------------

    // 单个控制指令下发，内容是　Command
    fun devControl(beeId: String): String = "$EIG_IN/C/$beeId"

    // 重置所有通道, 内容是 TransportInfoes
    fun reset(beeId: String): String = "$EIG_IN/Reset/$beeId"
    // 重置测点，内容是 MeasurePoints
    fun reloadPoints(beeId: String): String = "$EIG_IN/ReloadPoints/$beeId"
    // 重置定时任务，内容是 JobDefines
    fun jobDefine(beeId: String):  String = "$EIG_IN/JobD/$beeId"
    // 查询网关概况，内容为空
    fun gwPeek(beeId: String):  String = "$EIG_IN/SysPeek/$beeId"
    // 查询历史数据，内容是 HisDataQuery
    fun hisMeasure(beeId: String):  String = "$EIG_IN/H/$beeId"
    // 查询指令，内容是 HisCommandQuery
    fun hisCommand(beeId: String):  String = "$EIG_IN/HC/$beeId"
    // 查询事件，内容是 HisEventQuery
    fun hisEvent(beeId: String):  String = "$EIG_IN/HE/$beeId"
    // 查询SOE，内容是 HisSoeQuery
    fun hisSoe(beeId: String):  String = "$EIG_IN/HS/$beeId"
    // 查询当前所有数据，内容为空
    fun callAll(beeId: String):  String = "$EIG_IN/AM/$beeId"

    // --------------------- from gateway to users ------------------------

    // 量测数据是以网关为单位打包上传，内容是 MeasureValues
    fun eigMeasured(beeId: String): String = "$EIG_OUT/MM_/$beeId"
    // 变化数据上传，单个测量值，内容是 MeasureValue
    fun measureChanged(beeId: String): String = "$EIG_OUT/SM_/$beeId"
    // 所有当前所有量测值的命令，内容是 MeasureValues
    fun callAlled(beeId: String): String = "$EIG_OUT/AM_/$beeId"
    // 控制结果返回，内容是 ControlBackInfo
    fun devControlled(beeId: String): String = "$EIG_OUT/C_/$beeId"
    // 事件处理结果，内容是 Event
    fun eventHandled(beeId: String): String = "$EIG_OUT/EH_/$beeId"

    // 网关的概况，内容是 GwProfile
    fun gwPeeked(beeId: String):  String = "$EIG_OUT/SysPeeked/$beeId"
    // 历史数据，内容是 MeasureValues
    fun hisMeasured(beeId: String): String = "$EIG_OUT/HM_/$beeId"
    // 历史指令，内容是 EventCommands
    fun hisCommanded(beeId: String): String = "$EIG_OUT/HC_/$beeId"
    // 历史事件，内容是 Events
    fun hisEvented(beeId: String): String = "$EIG_OUT/HE_/$beeId"
    // 历史soe，内容是 SoeRecords
    fun hisSoed(beeId: String): String = "$EIG_OUT/HS_/$beeId"
    // 系统自动发送的指令，内容是　Command
    fun controlMonitor(beeId: String): String = "$EIG_OUT/LC/$beeId"

    //　--------------------- 其他topic ------------------------

    // 通道通断的情况，内容是 String（portId）
    val portConnected = "$EIG_OUT/portConnected"
    val portDisconnected = "$EIG_OUT/portDisconnected"
    // 检测到事件发生
    val eventComing = "$EIG_IN/eventComing"
    val pointReloaded = "$EIG_IN/pointReloaded"
}