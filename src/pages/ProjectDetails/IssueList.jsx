import { CardHeader, CardTitle , Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import IssueCard from "./IssueCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { DialogHeader } from "@/components/ui/dialog"
import CreateIssueForm from './CreateIssueForm'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchIssues } from "@/Redux/Issue/Action"
import { useParams } from "react-router-dom"

function IssueList ({title , status }) {
    
    const dispatch = useDispatch();
    const {id} = useParams();
    const {issue} = useSelector(store=>store)

    useEffect(() => {
        dispatch(fetchIssues(id))
    },[id])

    return (
        <div>
           <Dialog>
              <Card className="w-full md:w-[300px] lg:w-[300px]">
                  <CardHeader >
                       <CardTitle>
                            {title}
                       </CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                        <div className="space-y-2" >
                           {issue.issues?.filter((issue=>issue.status == status)).map((item) => <IssueCard item={item} projectId={id} key={item.id}/>) }
                        </div>
                  </CardContent>
                  <CardFooter>
                      <DialogTrigger asChild>
                           <Button variant="outline" className="w-full border flex item-center gap-2">
                               <PlusIcon/>
                               Create Issue
                           </Button>
                      </DialogTrigger>
                      <DialogContent>
                           <DialogHeader>
                              <DialogTitle>
                                  Create New Issue
                              </DialogTitle>
                           </DialogHeader>
                           <CreateIssueForm status={status}/>
                      </DialogContent>
                  </CardFooter>
              </Card>
           </Dialog>
        </div>
    )
}

export default IssueList