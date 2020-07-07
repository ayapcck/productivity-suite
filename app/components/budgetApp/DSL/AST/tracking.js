export const Tracking = (trackingList) => {
    return {
        accept: function(visitor) {
            visitor.visit(this);
        },
        trackingList
    };
};