const setTimestamp = async shema => {
    try {
        shema.add({
            createdAt: Date,
            updatedAt: Date,
        });

        shema.pre('save', function(next) {
            const now = Date.now();

            this.updatedAt = now;

            if(!this.createdAt){
                this.createdAt = now;
            };

            next();
        });
    } catch(err){
        return nextTick(err);
    };
};

export default setTimestamp;