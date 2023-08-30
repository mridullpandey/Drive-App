class ModuleName {
    constructor(tenantId, SK) {
        this.PK = `ModuleName#${tenantId}`
        this.SK = SK
    }

    build(data) {
        this.moduleNameName = data.moduleNameName
        this.moduleNameId = data.moduleNameId || this.SK
        this.isActive = data.isActive || true
        this.isDeleted = data.isDeleted || 0
        this.isRelevant = data.isRelevant || 1
        if (data.hasOwnProperty("addedOn")) {
            this.addedOn = data.addedOn
        }
        return this
    }

    create() {
        this.addedOn = Date.now()
        this.modifiedOn = Date.now()
        return this
    }

    update() {
        this.Key = {}
        this.Key.PK = this.PK
        this.Key.SK = this.SK
        this.modifiedOn = Date.now()
        return this
    }
}