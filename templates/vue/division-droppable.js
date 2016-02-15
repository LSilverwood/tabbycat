<!-- Table Template -->
<script type="text/x-template" id="division-droppable">

  <div class="col-md-3">
    <div class="panel panel-default">

      <div class="panel-heading">

        <h4>Division [[ division.name ]]</h4>

        <select name="select" class="form-control" v-model="division.venue_group" v-on:change="saveDivisionVenueGroup">

          <option value=""></option>
          <option v-for="vg in vgs" value="[[ vg.id ]]" v-bind:value="vg.id">
            [[ vg.short_name ]] (x/[[ vg.team_capacity ]])
          </option>

        </select>

      </div>

      <div class="panel-body" v-drag-and-drop drop="handleDrop" data-id="[[ division.id ]]">

        <template v-for="team in division.teams" track-by="id">
          <team-draggable :team="team"></team-draggable>
        </template>

      </div>

    </div>
  </div>

</script>

<!-- Division Droppable Component Behaviour -->
<script>
  Vue.component('division-droppable', {
    props: ['division', 'vgs', 'save-vg-at'],
    template: '#division-droppable',
    methods: {
      saveDivisionVenueGroup: function(event) {
        $.ajax({
            url: this.saveVgAt,
            type: "POST",
            data: {
              'venueGroup': this.division.venue_group,
              'division': this.division.id,
            },
            success:function(response){
              console.log('Saved division\'s venue group')
            },
            error:function (xhr, textStatus, thrownError){
              alert('Failed to save a divisions venue group change')
            }
        });
      }
    }
  })
</script>
